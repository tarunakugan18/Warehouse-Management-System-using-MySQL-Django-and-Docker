from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout
from django.http import JsonResponse
from .models import Inbound, Supplier
from products.models import Product
import json


# Fetch and fill up supplier id in the page
def fetch_supplier_id(request):
    try:
        # Fetch data from the Supplier model
        suppliers_data = Supplier.objects.values_list("supplier_id", flat=True)

        # Convert data to a list
        supplier_ids = list(suppliers_data)

        return JsonResponse({"supplier_ids": supplier_ids})
    except Exception as e:
        return JsonResponse({"error": str(e)})

# Fetch and fill up product sku in the page
def fetch_product_sku(request):
    try:
        # Fetch data from the Supplier model
        product_sku_data = Product.objects.values_list("product_sku", flat=True)

        # Convert data to a list
        product_skus = list(product_sku_data)

        return JsonResponse({"product_skus": product_skus})
    except Exception as e:
        return JsonResponse({"error": str(e)})


# Render the page inbound.html
def inbounds(request):
    if request.user.is_authenticated:

        # Call fetch_supplier_id to get supplier_ids
        supplier_ids_response = fetch_supplier_id(request)

        # Check if there's an error
        supplier_id_response_content = supplier_ids_response.content.decode("utf-8")
        supplier_id_response_data = json.loads(supplier_id_response_content)

        error = ""

        if "error" in supplier_id_response_data:
            error += (
                '<div class="error-message"><b>Error: </b> '
                + supplier_id_response_data["error"]
                + "</div>"
            )

        # Call fetch_supplier_id to get supplier_ids
        product_skus_response = fetch_product_sku(request)

        # Check if there's an error
        product_sku_response_content = product_skus_response.content.decode("utf-8")
        product_sku_response_data = json.loads(product_sku_response_content)

        if "error" in product_sku_response_data:
            error += (
                '<div class="error-message"><b>Error: </b> '
                + product_sku_response_data["error"]
                + "</div>"
            )

        # Get user and supplier_ids
        user = request.user
        supplier_ids = supplier_id_response_data.get("supplier_ids", [])
        product_skus = product_sku_response_data.get("product_skus", [])

        return render(
            request,
            "inbound.html",
            {"user": user, "supplier_ids": supplier_ids, "product_skus": product_skus, "error": error},
        )
    else:
        return redirect("home")


# Fetch all the table data
def fetch_inbound_data(request):

    if not request.user.is_authenticated:
        return JsonResponse({"error": "User is not authenticated"})

    return_data = {"error": "", "data": []}

    try:
        # Fetch data from the Inbound model
        inbound_data = Inbound.objects.all().values()

        # Convert data to a list
        return_data["data"] = list(inbound_data)

    except Exception as e:
        return_data["error"] = str(e)

    return JsonResponse(return_data)

# Fetch all the table data
def fetch_suppliers_data(request):

    if not request.user.is_authenticated:
        return JsonResponse({"error": "User is not authenticated"})

    return_data = {"error": "", "data": []}

    try:
        # Fetch data from the Inbound model
        supplier_data = Supplier.objects.all().values()

        # Convert data to a list
        return_data["data"] = list(supplier_data)

    except Exception as e:
        return_data["error"] = str(e)

    return JsonResponse(return_data)


def manage_suppliers_data(request):

    if request.method == "POST" and "submit-add-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            name = request.POST.get("name")
            email = request.POST.get("email")

            # Insert data into the Supplier model
            Supplier.objects.create(
                name=name,
                email=email,
            )

            return_json["success"] = "Supplier data inserted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "update-btn" in request.POST:

        return_json = {"error": "", "success": ""}

        try:
            supplier_id = int(request.POST.get("supplier-id"))
            name = request.POST.get("name")
            email = request.POST.get("email")

            # Retrieve the Supplier instance based on supplier_id
            supplier_instance = get_object_or_404(Supplier, supplier_id=supplier_id)

            # Update fields and save the instance
            supplier_instance.name = name
            supplier_instance.email = email

            supplier_instance.save()

            return_json["success"] = "Supplier data has been updated successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "delete-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            supplier_id = int(request.POST.get("supplier-id"))

            # Get the Supplier object to delete
            supplier_object = Supplier.objects.get(supplier_id=supplier_id)

            # Delete the Supplier object
            supplier_object.delete()

            return_json["success"] = "Supplier data has been deleted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "edit-btn" in request.POST:
        return_json = {
            "supplierID": "",
            "name": "",
            "email": "",
            "error": ""
        }

        try:
            supplier_id_str = request.POST.get("supplier-id")

            if supplier_id_str is not None:
                supplier_id = int(supplier_id_str)

                # Get the Supplier object
                supplier_object = Supplier.objects.get(supplier_id=supplier_id)

                # Populate return_json with Supplier data
                return_json["supplierID"] = supplier_object.supplier_id
                return_json["name"] = supplier_object.name
                return_json["email"] = supplier_object.email
            else:
                return_json["error"] = "Supplier ID is not provided in the POST data."

        except Supplier.DoesNotExist:
            return_json["error"] = f"No data available for Supplier with ID: {supplier_id}"
        except ValueError:
            return_json["error"] = "Invalid supplier ID. It must be an integer."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    else:
        return JsonResponse(
            {"error": "Invalid request method or missing edit-btn in POST data"}
        )


def manage_inbound_data(request):

    if request.method == "POST" and "submit-add-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            reference = request.POST.get("reference")
            date_received = request.POST.get("date-received")
            product_sku = request.POST.get("product-sku")
            quantity = int(request.POST.get("quantity"))
            location = request.POST.get("location")
            remarks = request.POST.get("remarks")
            supplier_id = int(request.POST.get("supplier-id"))

            # Retrieve the Supplier instance based on supplier_id
            supplier_instance = get_object_or_404(Supplier, supplier_id=supplier_id)

            # Insert data into the Inbound model
            Inbound.objects.create(
                reference=reference,
                date_received=date_received,
                product_sku=product_sku,
                quantity=quantity,
                location=location,
                remarks=remarks,
                supplier_id=supplier_instance,
            )

            return_json["success"] = "Inbound data inserted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "update-btn" in request.POST:

        print("------------------------------------------")
        print(request.POST)

        return_json = {"error": "", "success": ""}

        try:
            id = int(request.POST.get("id"))
            reference = request.POST.get("reference")
            date_received = request.POST.get("date-received")
            product_sku = request.POST.get("product-sku")
            quantity = int(request.POST.get("quantity"))
            location = request.POST.get("location")
            remarks = request.POST.get("remarks")
            supplier_id = int(request.POST.get("supplier-id"))

            # Retrieve the Supplier instance based on supplier_id
            inbound_instance = get_object_or_404(Inbound, id=id)

            # Update fields and save the instance
            inbound_instance.reference = reference
            inbound_instance.date_received = date_received
            inbound_instance.product_sku = product_sku
            inbound_instance.quantity = quantity
            inbound_instance.location = location
            inbound_instance.remarks = remarks
            inbound_instance.supplier_id = get_object_or_404(Supplier, supplier_id=supplier_id)

            print(inbound_instance.supplier_id)

            inbound_instance.save()

            return_json["success"] = "Inbound data has been updated successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "delete-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            id = request.POST.get("id")

            # Get the Inbound object to delete
            inbound_object = Inbound.objects.get(id=id)

            # Delete the Inbound object
            inbound_object.delete()

            return_json["success"] = "Inbound data has been deleted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "edit-btn" in request.POST:
        return_json = {
            "id": "",
            "reference": "",
            "dateReceived": "",
            "productSKU": "",
            "quantity": "",
            "location": "",
            "remarks": "",
            "supplierID": "",
        }

        try:
            id = request.POST.get("id")

            # Get the Inbound object
            inbound_object = Inbound.objects.get(id=id)

            # Populate return_json with Inbound data
            return_json["id"] = inbound_object.id
            return_json["reference"] = inbound_object.reference
            return_json["dateReceived"] = inbound_object.date_received.strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            return_json["productSKU"] = inbound_object.product_sku
            return_json["quantity"] = inbound_object.quantity
            return_json["location"] = inbound_object.location
            return_json["remarks"] = inbound_object.remarks
            return_json["supplierID"] = inbound_object.supplier_id_id

        except Inbound.DoesNotExist:
            return_json["error"] = f"No data available for Inbound with ID: {id}"
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)
    else:
        return JsonResponse(
            {"error": "Invalid request method or missing edit-btn in POST data"}
        )


# Render the page inbound.html
def suppliers(request):
    if request.user.is_authenticated:

        user = request.user

        return render(request, "suppliers.html", {"user": user})
    else:
        return redirect("home")


# def outbound(request):
#     if request.user.is_authenticated:
#         return redirect('outbounds:outbound')
#     else:
#         return redirect("core:home")


# def operators(request):
#     if request.user.is_authenticated:
#         return redirect('users:operators')
#     else:
#         return redirect("core:home")


# # Render the page inbound.html
# def customers(request):
#     if request.user.is_authenticated:
#         return redirect('outbounds:customers')
#     else:
#         return redirect("core:home")


# # Render the page inbound.html
# def products(request):
#     if request.user.is_authenticated:
#         return redirect('products:products')
#     else:
#         return redirect("core:home")

