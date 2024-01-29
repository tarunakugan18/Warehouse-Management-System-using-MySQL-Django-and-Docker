user_id = document.getElementById("user-id");
user_id_error = document.getElementById("user-id-error");
user_password = document.getElementById("user-password");
user_password_error = document.getElementById("user-password-error");
user_type = document.getElementById("user-type");
user_type_error = document.getElementById("user-type-error");
submit_btn = document.getElementById("submit-btn");
error_message = document.getElementById("error-message");

var numbers = /^[0-9]+$/;
var password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;

function loadPage() {
    submit_btn.disabled = true;
}

function validateUserID() {
    if(user_id.value.length !== 4) {
        user_id_error.innerText = "Enter 4 characters for User ID field.";
        user_id.focus();
        user_id.style.border = "2px solid red";
    } else {
        user_id_error.innerText = "";
        user_id.style.border = "2px solid green";
    }
}

function validateUserPassword() {
    if(!(user_password.value.length >= 9 && user_password.value.length <= 50)) {
        user_password_error.innerText = "Enter more than 9 characters for User Password field.";
        user_password.focus();
        user_password.style.border = "2px solid red";
    } else {
        if(!user_password.value.match(password)) {
            user_password_error.innerText = "User Password field should contain at least one uppercase letter, one lowercase letter, one special character, and one number.";
            user_password.focus();
            user_password.style.border = "2px solid red";
        } else {
            user_password_error.innerText = "";
            user_password.style.border = "2px solid green";
        }
    }
}

function validateUserType() {
    if(user_type.selectedIndex === "0" || user_type.selectedIndex === "1") {
        user_type_error.innerText = "Choose a value for User Type field.";
        user_type.focus();
        user_type.style.border = "2px solid red";
    } else {
        user_type_error.innerText = "";
        user_type.style.border = "2px solid green";
    }
}

setInterval(() => {
    if (user_id.value.length !== 4 || !(user_password.value.length >= 9 && user_password.value.length <= 50) || !user_password.value.match(password)) {
        if(user_type.selectedIndex === "0" || user_type.selectedIndex === "1") {
            submit_btn.disabled = false;
        } else {
            submit_btn.disabled = true;
        }
    } else {
        submit_btn.disabled = false;
    }
}, 500);