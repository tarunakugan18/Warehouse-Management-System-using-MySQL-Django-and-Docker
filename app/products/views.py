from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout
from django.http import JsonResponse
from .models import Product
import json

# Render the page inbound.html
def products(request):
    if request.user.is_authenticated and request.user.user_type == "Warehouse Manager":
        # Get user
        user = request.user

        return render(request, "products.html", {"user": user})
    else:
        return redirect("home")


# Fetch all the table data
def fetch_products_data(request):

    if not request.user.is_authenticated:
        return JsonResponse({"error": "User is not authenticated"})

    return_data = {"error": "", "data": []}

    try:
        # Fetch data from the Inbound model
        product_data = Product.objects.all().values()

        # Convert data to a list
        return_data["data"] = list(product_data)

    except Exception as e:
        return_data["error"] = str(e)

    return JsonResponse(return_data)


def manage_products_data(request):

    if request.method == "POST" and "submit-add-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            product_sku = request.POST.get("product-sku")
            name = request.POST.get("name")
            description = request.POST.get("description")
            price = float(request.POST.get("price"))
            quantity = int(request.POST.get("quantity"))

            # Insert data into the Supplier model
            Product.objects.create(
                product_sku=product_sku,
                name=name,
                description=description,
                price=price,
                quantity=quantity,
            )

            return_json["success"] = "Product data inserted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "update-btn" in request.POST:

        return_json = {"error": "", "success": ""}

        try:
            product_sku = request.POST.get("product-sku")
            name = request.POST.get("name")
            description = request.POST.get("description")
            price = float(request.POST.get("price"))
            quantity = int(request.POST.get("quantity"))

            # Retrieve the Product instance based on product_sku
            product_instance = get_object_or_404(Product, product_sku=product_sku)

            # Update fields and save the instance
            product_instance.name = name
            product_instance.description = description
            product_instance.price = price
            product_instance.quantity = quantity

            product_instance.save()

            return_json["success"] = "Product data has been updated successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "delete-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            product_sku = request.POST.get("product-sku")

            # Get the Product object to delete
            product_object = Product.objects.get(product_sku=product_sku)

            # Delete the Product object
            product_object.delete()

            return_json["success"] = "Product data has been deleted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "edit-btn" in request.POST:
        return_json = {
            "productSKU": "",
            "name": "",
            "description": "",
            "price": "",
            "quantity": "",
            "error": ""
        }

        try:
            product_sku = request.POST.get("product-sku")

            if product_sku is not None:

                # Get the Product object
                product_object = Product.objects.get(product_sku=product_sku)

                # Populate return_json with Product data
                return_json["productSKU"] = product_object.product_sku
                return_json["name"] = product_object.name
                return_json["description"] = product_object.description
                return_json["price"] = product_object.price
                return_json["quantity"] = product_object.quantity
            else:
                return_json["error"] = "Product SKU is not provided in the POST data."

        except Product.DoesNotExist:
            return_json["error"] = f"No data available for Product with Product SKU: {product_sku}"
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    else:
        return JsonResponse(
            {"error": "Invalid request method or missing edit-btn in POST data"}
        )

