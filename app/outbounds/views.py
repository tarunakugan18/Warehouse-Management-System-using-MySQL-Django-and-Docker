from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout
from django.http import JsonResponse
from .models import Outbound, Customer
from inbounds.models import Supplier
from products.models import Product
import json


# Fetch and fill up Supplier id in the page
def fetch_customer_id(request):
    try:
        # Fetch data from the customer model
        customers_data = Customer.objects.values_list("customer_id", flat=True)

        # Convert data to a list
        customer_ids = list(customers_data)

        return JsonResponse({"customer_ids": customer_ids})
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
def outbounds(request):
    if request.user.is_authenticated:

        # Call fetch_customer_id to get customer_ids
        customer_ids_response = fetch_customer_id(request)

        # Check if there's an error
        customer_id_response_content = customer_ids_response.content.decode("utf-8")
        customer_id_response_data = json.loads(customer_id_response_content)

        error = ""

        if "error" in customer_id_response_data:
            error += (
                '<div class="error-message"><b>Error: </b> '
                + customer_id_response_data["error"]
                + "</div>"
            )

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

        # Get user and customer_ids
        user = request.user
        customer_ids = customer_id_response_data.get("customer_ids", [])
        product_skus = product_sku_response_data.get("product_skus", [])

        return render(
            request,
            "outbound.html",
            {"user": user, "customer_ids": customer_ids, "product_skus": product_skus, "error": error},
        )
    else:
        return redirect("core:home")


# Render the page customer.html
def customers(request):
    if request.user.is_authenticated:

        user = request.user

        return render(request, "customers.html", {"user": user})
    else:
        return redirect("core:home")


# Fetch all the table data
def fetch_outbound_data(request):

    if not request.user.is_authenticated:
        return JsonResponse({"error": "User is not authenticated"})

    return_data = {"error": "", "data": []}

    try:
        # Fetch data from the Inbound model
        outbound_data = Outbound.objects.all().values()

        # Convert data to a list
        return_data["data"] = list(outbound_data)

    except Exception as e:
        return_data["error"] = str(e)

    return JsonResponse(return_data)

# Fetch all the table data
def fetch_customers_data(request):

    if not request.user.is_authenticated:
        return JsonResponse({"error": "User is not authenticated"})

    return_data = {"error": "", "data": []}

    try:
        # Fetch data from the Inbound model
        customer_data = Customer.objects.all().values()

        # Convert data to a list
        return_data["data"] = list(customer_data)

    except Exception as e:
        return_data["error"] = str(e)

    return JsonResponse(return_data)


def manage_customers_data(request):

    if request.method == "POST" and "submit-add-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            name = request.POST.get("name")
            email = request.POST.get("email")

            # Insert data into the Customer model
            Customer.objects.create(
                name=name,
                email=email,
            )

            return_json["success"] = "Customer data inserted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "update-btn" in request.POST:

        return_json = {"error": "", "success": ""}

        try:
            customer_id = int(request.POST.get("customer-id"))
            name = request.POST.get("name")
            email = request.POST.get("email")

            # Retrieve the Customer instance based on customer_id
            customer_instance = get_object_or_404(Customer, customer_id=customer_id)

            # Update fields and save the instance
            customer_instance.name = name
            customer_instance.email = email

            customer_instance.save()

            return_json["success"] = "Customer data has been updated successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "delete-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            customer_id = int(request.POST.get("customer-id"))

            # Get the Customer object to delete
            customer_object = Customer.objects.get(customer_id=customer_id)

            # Delete the Customer object
            customer_object.delete()

            return_json["success"] = "Customer data has been deleted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "edit-btn" in request.POST:
        return_json = {
            "customerID": "",
            "name": "",
            "email": "",
            "error": ""
        }

        try:
            customer_id_str = request.POST.get("customer-id")

            if customer_id_str is not None:
                customer_id = int(customer_id_str)

                # Get the Supplier object
                customer_object = Customer.objects.get(customer_id=customer_id)

                # Populate return_json with Customer data
                return_json["customerID"] = customer_object.customer_id
                return_json["name"] = customer_object.name
                return_json["email"] = customer_object.email
            else:
                return_json["error"] = "Customer ID is not provided in the POST data."

        except Customer.DoesNotExist:
            return_json["error"] = f"No data available for Supplier with ID: {customer_id}"
        except ValueError:
            return_json["error"] = "Invalid Customer ID. It must be an integer."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    else:
        return JsonResponse(
            {"error": "Invalid request method or missing edit-btn in POST data"}
        )


def manage_outbound_data(request):

    if request.method == "POST" and "submit-add-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            reference = request.POST.get("reference")
            date_received = request.POST.get("date-received")
            product_sku = request.POST.get("product-sku")
            quantity = int(request.POST.get("quantity"))
            destination = request.POST.get("destination")
            remarks = request.POST.get("remarks")
            customer_id = int(request.POST.get("customer-id"))

            # Retrieve the Customer instance based on customer_id
            customer_instance = get_object_or_404(Customer, customer_id=customer_id)

            # Insert data into the Inbound model
            Outbound.objects.create(
                reference=reference,
                date_received=date_received,
                product_sku=product_sku,
                quantity=quantity,
                destination=destination,
                remarks=remarks,
                customer_id=customer_instance,
            )

            return_json["success"] = "Outbound data inserted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "update-btn" in request.POST:

        return_json = {"error": "", "success": ""}

        try:
            id = int(request.POST.get("id"))
            reference = request.POST.get("reference")
            date_received = request.POST.get("date-received")
            product_sku = request.POST.get("product-sku")
            quantity = int(request.POST.get("quantity"))
            destination = request.POST.get("destination")
            remarks = request.POST.get("remarks")
            customer_id = int(request.POST.get("customer-id"))

            # Retrieve the Customer instance based on customer_id
            outbound_instance = get_object_or_404(Outbound, id=id)

            # Update fields and save the instance
            outbound_instance.reference = reference
            outbound_instance.date_received = date_received
            outbound_instance.product_sku = product_sku
            outbound_instance.quantity = quantity
            outbound_instance.destination = destination
            outbound_instance.remarks = remarks
            outbound_instance.customer_id = get_object_or_404(Customer, customer_id=customer_id)

            print(outbound_instance.customer_id)

            outbound_instance.save()

            return_json["success"] = "Outbound data has been updated successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "delete-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            id = request.POST.get("id")

            # Get the Customer object to delete
            Outbound_object = Outbound.objects.get(id=id)

            # Delete the customer object
            Outbound_object.delete()

            return_json["success"] = "Outbound data has been deleted successfully."
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
            "destination": "",
            "remarks": "",
            "customerID": "",
        }

        try:
            id = request.POST.get("id")

            # Get the Outbound object
            outbound_object = Outbound.objects.get(id=id)

            # Populate return_json with Outbound data
            return_json["id"] = outbound_object.id
            return_json["reference"] = outbound_object.reference
            return_json["dateReceived"] = outbound_object.date_received.strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            return_json["productSKU"] = outbound_object.product_sku
            return_json["quantity"] = outbound_object.quantity
            return_json["destination"] = outbound_object.destination
            return_json["remarks"] = outbound_object.remarks
            return_json["customerID"] = outbound_object.customer_id_id

        except Outbound.DoesNotExist:
            return_json["error"] = f"No data available for Outbound with ID: {id}"
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)
    else:
        return JsonResponse(
            {"error": "Invalid request method or missing edit-btn in POST data"}
        )
