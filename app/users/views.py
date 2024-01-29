from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout
from django.http import JsonResponse
from .models import User
import json

# Render the page inbound.html
def operators(request):
    if request.user.is_authenticated and request.user.user_type == "Warehouse Manager":
        # Get user
        user = request.user

        return render(request, "operators.html", {"user": user})
    else:
        return redirect("home")


# Fetch all the table data
def fetch_operators_data(request):

    if not request.user.is_authenticated:
        return JsonResponse({"error": "User is not authenticated"})

    return_data = {"error": "", "data": []}

    try:
        # Fetch data from the Inbound model
        user_data = User.objects.filter(user_type='Operator').values()

        # Convert data to a list
        return_data["data"] = list(user_data)

    except Exception as e:
        return_data["error"] = str(e)

    return JsonResponse(return_data)


def manage_operators_data(request):

    if request.method == "POST" and "submit-add-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            name = request.POST.get("name")
            password = request.POST.get("password")

            # Insert data into the Supplier model
            User.objects.create(
                name=name,
                password=password,
                user_type='Operator',
            )

            return_json["success"] = "User data inserted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "update-btn" in request.POST:

        return_json = {"error": "", "success": ""}

        try:
            user_id = int(request.POST.get("user-id"))
            name = request.POST.get("name")

            # Retrieve the Product instance based on product_sku
            user_instance = get_object_or_404(User, user_id=user_id)

            # Update fields and save the instance
            user_instance.name = name

            user_instance.save()

            return_json["success"] = "User data has been updated successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "delete-btn" in request.POST:
        return_json = {"error": "", "success": ""}

        try:
            user_id = int(request.POST.get("user-id"))

            # Get the Product object to delete
            user_object = User.objects.get(user_id=user_id)

            # Delete the Product object
            user_object.delete()

            return_json["success"] = "User data has been deleted successfully."
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    elif request.method == "POST" and "edit-btn" in request.POST:
        return_json = {
            "userID": "",
            "name": "",
            "error": ""
        }

        try:
            user_id = int(request.POST.get("user-id"))

            if user_id is not None:

                # Get the Product object
                user_object = User.objects.get(user_id=user_id)

                # Populate return_json with Product data
                return_json["userID"] = user_object.user_id
                return_json["name"] = user_object.name
            else:
                return_json["error"] = "User ID is not provided in the POST data."

        except Product.DoesNotExist:
            return_json["error"] = f"No data available for User with User ID: {user_id}"
        except Exception as e:
            return_json["error"] = str(e)

        return JsonResponse(return_json)

    else:
        return JsonResponse(
            {"error": "Invalid request method or missing edit-btn in POST data"}
        )

