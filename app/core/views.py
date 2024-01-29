from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
import re


def home(request):
    if request.user.is_authenticated:
        user = request.user
        # Ensure the user is authenticated
        if user.user_type == "Warehouse Manager":
            # If the user is a Warehouse Manager, redirect them to the appropriate page
            return redirect("inbounds")
        elif user.user_type == "Operator":
            # If the user is an Operator, redirect them to the appropriate page
            return redirect("inbounds")
        else:
            return user_logout(request)
    elif request.method == "POST":
        # Handle login logic as before
        user_id = request.POST.get("user-id")
        user_password = request.POST.get("user-password")
        user_type = request.POST.get("user-type")

        # Validate form data
        message = validate_form_data(user_id, user_password, user_type)

        if not message:
            user = authenticate(
                request, user_id=user_id, password=user_password, user_type=user_type
            )

            if user:

                if user_type == "Warehouse Manager":

                    if not (user.user_type == "Warehouse Manager" and user_type == "Warehouse Manager"):
                        messages.error(request, "Please choose correct User Type.")
                    else:
                        login(request, user)

                        return redirect("inbounds")

                elif user_type == "Operator":

                    if not (user.user_type == "Operator" and user_type == "Operator"):
                        messages.error(request, "Please choose correct User Type.")
                    else:
                        login(request, user)

                        return redirect("inbounds")

                else:
                    messages.error(request, "Invalid User Type.")
            else:
                messages.error(request, "Wrong User ID or User Password.")
        else:
            messages.error(request, message)

    return render(request, "index.html")


def user_logout(request):
    logout(request)
    return redirect("home")


# Validates User ID
def validate_user_id(user_id):
    if len(user_id) != 4:
        return "Enter 4 characters for User ID field."
    return ""


# Validates User Password
def validate_user_password(user_password):
    if not (9 <= len(user_password) <= 50):
        return "Enter more than 9 characters for User Password field."

    password_pattern = re.compile(
        r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$"
    )
    if not password_pattern.match(user_password):
        return "User Password field should contain at least one uppercase letter, one lowercase letter, one special character, and one number."

    return ""


# Validates User Type
def validate_user_type(user_type):
    if user_type in ["0", "1"]:
        return "Choose a value for User Type field."
    return ""


# Validates Form Data
def validate_form_data(user_id, user_password, user_type):
    # Perform individual validations
    id_error = validate_user_id(user_id)
    password_error = validate_user_password(user_password)
    type_error = validate_user_type(user_type)

    # Combine errors into a single message
    error_message = f"{id_error}\n{password_error}\n{type_error}".strip()

    # Return the error message (empty string if no errors)
    return error_message
