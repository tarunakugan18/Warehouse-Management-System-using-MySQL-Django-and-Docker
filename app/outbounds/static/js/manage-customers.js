const manage_customers_data_modal = document.getElementById("manage-customers-modal");
const delete_confirmation_modal = document.getElementById("delete-confirmation-modal");
const form_customers_data_add_btn_container = document.getElementById("form-customers-data-add-btn-container");
const form_customers_data_update_delete_btns_container = document.getElementById("form-customers-data-update-delete-btns-container");
const message_container = document.getElementById("message-container");
const manage_customers_data_modal_error_container = document.getElementById("manage-customers-data-modal-error-container");
const manage_customers_data_modal_content = document.getElementById("manage-customers-data-modal-content");
const table_filter_input = document.getElementById("table-filter-input");
const manage_buttons_container = document.getElementById("manage_buttons_container");

const form_customer_id = document.getElementById("form-customer-id");
const form_customer_id_error = document.getElementById("form-customer-id-error");
const form_name = document.getElementById("form-name");
const form_name_error = document.getElementById("form-name-error");
const form_email = document.getElementById("form-email");
const form_email_error = document.getElementById("form-email-error");
const add_btn = document.getElementById("add-btn");
const submit_add_btn = document.getElementById("submit-add-btn");
const update_btn = document.getElementById("update-btn");
const delete_btn = document.getElementById("delete-btn");
const customers_table_tbody = document.getElementById("customers-table-tbody");
const customers_table = document.getElementById("customers-table");

var letters = /^[a-zA-Z ]+$/;
var numbers = /^[0-9]+$/;
var date_time_local_timestamp = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/;
var alphanumeric = /^[0-9a-zA-Z ]+$/;
var password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;
var email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Variable databaseData stores the table data
var databaseData, table, sortColumns;
let sortAscending = false;

const size = 5;
let currentPage = 1;

function previousSection() {
    if(currentPage > 1)
        currentPage--;
    displayTable();

    const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));
    // Add event listener for all the elements with edit-btn class
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', function handleClick(event) {
            manageCustomersModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });

}

function nextSection() {
    if((currentPage * size) < databaseData.length)
        currentPage++;
    displayTable();

    const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));
    // Add event listener for all the elements with edit-btn class
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', function handleClick(event) {
            manageCustomersModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });

}

document.querySelector('#next-btn').addEventListener('click', nextSection, false);
document.querySelector('#previous-btn').addEventListener('click', previousSection, false);


function manageCustomersModalAllow(id, className) {

    if (className === "edit-btn") {

        // Allow update and delete buttons
        form_customers_data_update_delete_btns_container.style.display = "flex";
        form_customers_data_update_delete_btns_container.style.justifyContent = "flex-end";
        form_customers_data_add_btn_container.style.display = "none";

        form_customer_id.disabled = true;
        form_customer_id.style.border = "2px solid grey";
        form_name.disabled = true;
        form_name.style.border = "2px solid grey";
        form_email.disabled = true;
        form_email.style.border = "2px solid grey";

        manage_customers_data_modal_error_container.innerHTML = '';


        const form_data = new FormData();

        form_data.append("customer-id", id);
        form_data.append("edit-btn", "");

        var ajax_request = new XMLHttpRequest();
        // Get the CSRF token from the cookie
        const csrftoken = getCookie('csrftoken');
        ajax_request.open('POST', submitCustomersDataURL);
        
        // Set the CSRF token in the request header
        ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
        ajax_request.send(form_data);

        ajax_request.onreadystatechange = function() {
            if(ajax_request.readyState == 4 && ajax_request.status == 200) {
                form_customer_id.disabled = false;
                form_name.disabled = false;
                form_email.disabled = false;

                var results = JSON.parse(ajax_request.responseText);

                if(results.error && results.error.length > 0) {
                    // Display based on events
                    message_container.innerHTML = '<div class="error-message"><b>Error: </b> ' + results.error + '</div>';
                    manage_customers_data_modal_content.style.overflowY = "scroll";
                } else {

                    manage_customers_data_modal.style.display = "block";

                    // Display based on events
                    form_customer_id.value = results.customerID;
                    form_name.value = results.name;
                    form_email.value = results.email;
                }
            }
        }

    } else if (className === "add-btn") {

        // Allow add button
        form_customers_data_add_btn_container.style.display = "flex";
        form_customers_data_add_btn_container.style.justifyContent = "flex-end";
        form_customers_data_update_delete_btns_container.style.display = "none";

        manage_customers_data_modal_error_container.innerHTML = '';

        // Customer ID has to be disabled. Default value set in the database.
        form_customer_id.value = "";
        form_customer_id.disabled = true;
        form_customer_id.style.border = "2px solid grey";
        form_name.value = "";
        form_name.disabled = false;
        form_name.style.border = "2px solid grey";
        form_email.value = "";
        form_email.disabled = false;
        form_email.style.border = "2px solid grey";

        // Display the modal popup
        manage_customers_data_modal.style.display = "block";
    }
}

function addCustomersData() {

    // Validate Reference
    if (!(form_name.value.length > 0 && form_name.value.length <= 250)) {
        form_name_error.innerText = "Enter a valid value for Name field.";
        form_name.focus();
        form_name.style.border = "2px solid red";
    } else {
        if (!form_name.value.match(alphanumeric)) {
            form_name_error.innerText = "Enter only alphanumeric characters for Name field.";
            form_name.focus();
            form_name.style.border = "2px solid red";
        } else {
            form_name_error.innerText = "";
            form_name.style.border = "2px solid green";

            // Validate Product SKU
            if (!form_email.value.match(email)) {
                form_email_error.innerText = "Please follow abc@def.com format for Email field.";
                form_email.focus();
                form_email.style.border = "2px solid red";
            } else {
                // Validate Email
                if (!(form_email.value.length > 0 && form_email.value.length <= 250)) {
                    form_email_error.innerText = "Enter a valid value for Email field.";
                    form_email.focus();
                    form_email.style.border = "2px solid red";
                } else {
                    form_email_error.innerText = "";
                    form_email.style.border = "2px solid green";

                    // Disable
                    form_name.disabled = true;
                    form_email.disabled = true;
                    submit_add_btn.disabled = true;
                    submit_add_btn.innerText = "Loading ...";

                    const form_data = new FormData();

                    form_data.append("name", form_name.value);
                    form_data.append("email", form_email.value);
                    form_data.append("submit-add-btn", "");

                    var ajax_request = new XMLHttpRequest();
                    // Get the CSRF token from the cookie
                    const csrftoken = getCookie('csrftoken');
                    ajax_request.open('POST', submitCustomersDataURL);
                    
                    // Set the CSRF token in the request header
                    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
                    ajax_request.send(form_data);

                    ajax_request.onreadystatechange = function () {
                        if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                            // Enable
                            form_name.disabled = false;
                            form_email.disabled = false;
                            submit_add_btn.disabled = false;
                            submit_add_btn.innerText = "Submit";

                            try {
                                var results = JSON.parse(ajax_request.responseText);
                                manage_customers_data_modal_content.style.overflowY = "scroll";

                                if (results.error && results.error.length > 0) {
                                    // Display based on events
                                    manage_customers_data_modal_content.scrollTop = 0;
                                    manage_customers_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                                }
                                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                                    // Display based on events
                                    manage_customers_data_modal_content.scrollTop = 0;
                                    manage_customers_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                                }
                                if (results.success && results.success.length > 0) {
                                    // Display based on events
                                    manage_customers_data_modal_content.scrollTop = 0;
                                    manage_customers_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refreshing page in 3 seconds.</div>';

                                    setTimeout(() => {
                                        window.location = window.location;
                                    }, 3000);
                                }
                            } catch (e) {
                                alert("Error parsing JSON: " + e);
                            }
                        }
                    }            
                }
            }
        }
    }
}

function updateCustomersData() {
    form_customer_id.style.border = "2px solid green";

    // Validate Reference
    if (!(form_name.value.length > 0 && form_name.value.length <= 250)) {
        form_name_error.innerText = "Enter a valid value for Name field.";
        form_name.focus();
        form_name.style.border = "2px solid red";
    } else {
        if (!form_name.value.match(alphanumeric)) {
            form_name_error.innerText = "Enter only alphanumeric characters for Name field.";
            form_name.focus();
            form_name.style.border = "2px solid red";
        } else {
            form_name_error.innerText = "";
            form_name.style.border = "2px solid green";

            if (!form_email.value.match(email)) {
                form_email_error.innerText = "Please follow abc@def.com format for Email field.";
                form_email.focus();
                form_email.style.border = "2px solid red";
            } else {

                // Validate Email
                if (!(form_email.value.length > 0 && form_email.value.length <= 250)) {
                    form_email_error.innerText = "Enter a valid value for Email field.";
                    form_email.focus();
                    form_email.style.border = "2px solid red";
                } else {
                    form_email_error.innerText = "";
                    form_email.style.border = "2px solid green";

                    // Disable
                    form_customer_id.disabled = true;
                    form_name.disabled = true;
                    form_email.disabled = true;
                    update_btn.disabled = true;
                    update_btn.innerText = "Loading ...";

                    const form_data = new FormData();

                    form_data.append("customer-id", form_customer_id.value);
                    form_data.append("name", form_name.value);
                    form_data.append("email", form_email.value);
                    form_data.append("update-btn", "");

                    var ajax_request = new XMLHttpRequest();
                    // Get the CSRF token from the cookie
                    const csrftoken = getCookie('csrftoken');
                    ajax_request.open('POST', submitCustomersDataURL);
                    
                    // Set the CSRF token in the request header
                    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
                    ajax_request.send(form_data);

                    ajax_request.onreadystatechange = function () {
                        if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                            // Enable
                            form_customer_id.disabled = false;
                            form_name.disabled = false;
                            form_email.disabled = false;
                            update_btn.disabled = false;
                            update_btn.innerHTML = '<i class="fa fa-edit"></i> Update';

                            try {
                                var results = JSON.parse(ajax_request.responseText);
                                manage_customers_data_modal_content.style.overflowY = "scroll";

                                if (results.error && results.error.length > 0) {
                                    // Display based on events
                                    manage_customers_data_modal_content.scrollTop = 0;
                                    manage_customers_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                                }
                                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                                    // Display based on events
                                    manage_customers_data_modal_content.scrollTop = 0;
                                    manage_customers_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                                }
                                if (results.success && results.success.length > 0) {
                                    // Display based on events
                                    manage_customers_data_modal_content.scrollTop = 0;
                                    manage_customers_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refreshing page in 3 seconds.</div>';

                                    setTimeout(() => {
                                        window.location = window.location;
                                    }, 3000);
                                }
                            } catch (e) {
                                alert("Error parsing JSON: " + e);
                            }
                        }
                    }
                }
        }
        }
    }
}

function deleteCustomersData() {
    // Disable
    form_customer_id.disabled = true;
    form_name.disabled = true;
    form_email.disabled = true;
    delete_btn.disable = true;
    update_btn.disable = true;
    delete_btn.innerText = "Loading ...";
    
    const form_data = new FormData();
    
    form_data.append("customer-id", form_customer_id.value);
    form_data.append("delete-btn", "");

    var ajax_request = new XMLHttpRequest();
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    ajax_request.open('POST', submitCustomersDataURL);
    
    // Set the CSRF token in the request header
    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
    ajax_request.send(form_data);
    
    ajax_request.onreadystatechange = function() {
        if(ajax_request.readyState == 4 && ajax_request.status == 200) {
            // Enable
            form_customer_id.disabled = false;
            form_name.disabled = false;
            form_email.disabled = false;
            update_btn.disable = false;
            delete_btn.disable = false;
            delete_btn.innerHTML = '<i class="fa fa-times"></i> Delete';

            try {
                var results = JSON.parse(ajax_request.responseText);
                manage_customers_data_modal_content.style.overflowY = "scroll";

                if (results.error && results.error.length > 0) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_customers_data_modal_content.scrollTop = 0;
                    manage_customers_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                }
                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_customers_data_modal_content.scrollTop = 0;
                    manage_customers_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                } 
                if (results.success && results.success.length > 0) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_customers_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refresing page in 3 seconds.</div>';

                    setTimeout(() => {
                        window.location = window.location;
                    }, 3000);
                }
            } catch (e) {
                alert("Error parsing JSON: " + e);
            }
        }
    }
}

document.onkeydown = (evt) => {
    evt = evt || window.event;
    if (evt.key == 27) {
        if (manage_customers_data_modal.style.display === "block") {
            manage_customers_data_modal.style.display = "none";
        }
    }
};

window.onclick = (event) => {
    if (event.target == manage_customers_data_modal) {
        manage_customers_data_modal.style.display = "none";
    }

    if (event.target == delete_confirmation_modal) {
        delete_confirmation_modal.style.display = "none";
    }

}

function deleteConfirmationModalAllow() {
    delete_confirmation_modal.style.display = "block";
}

function deleteConfirmationModalClose() {
    if (delete_confirmation_modal.style.display === "block") {
        delete_confirmation_modal.style.display = "none";
    }
}

function manageCustomersModalClose() {
    if (manage_customers_data_modal.style.display === "block") {
        manage_customers_data_modal.style.display = "none";
    }
}


// Add event listener for add-btn class. The -1 does not have a real meaning. It is just for putting a value as the parameter requires an argument here.
add_btn.addEventListener('click', function handleClick(event) {
    manageCustomersModalAllow("-1", this.className);
});

function sortTable(e) {
    let thisSorted = e.target.dataset.sort;

    if(sortColumns === thisSorted) sortAscending = !sortAscending;
        sortColumns = thisSorted;

    databaseData.sort((c, d) => {
        if(c[sortColumns] < d[sortColumns]) return sortAscending?1:-1;
        if(c[sortColumns] > d[sortColumns]) return sortAscending?-1:1;
        return 0;
    });

    displayTable();

    const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));
    // Add event listener for all the elements with edit-btn class
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', function handleClick(event) {
            manageCustomersModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });
}

function filterTable() {
    displayTable();

    const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));
    // Add event listener for all the elements with edit-btn class
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', function handleClick(event) {
            manageCustomersModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });
}

function displayTable() {
    var results = '';

    databaseData.filter((rowSection, currentIndex) => {
        let startSection = (currentPage - 1) * size;
        let endSection = currentPage * size;

        if(currentIndex >= startSection && currentIndex < endSection) {
            if (table_filter_input.value.length > 0) {
                if (table_filter_input.value.length > 0 && (rowSection.customer_id.toString().includes(table_filter_input.value) || rowSection.name.includes(table_filter_input.value) || rowSection.email.includes(table_filter_input.value))) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }

    }).forEach(dt => {
        results += `
        <tbody>
            <tr data-id='${dt.customer_id}'>
            <td>${dt.customer_id}</td>
            <td>${dt.name}</td>
            <td>${dt.email}</td>
            <td><button type="button" class="edit-btn">
                    <i class="fa fa-edit"></i> Edit
                </button></td>
            </tr>
        </tbody>`;
    });

    customers_table_tbody.innerHTML = results;
}

// Function to get the CSRF token from the cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function loadPage() {
    const form_data = new FormData();
    form_data.append("fetch-customers-data", "");

    var ajax_request = new XMLHttpRequest();
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    ajax_request.open('POST', fetchCustomersDataURL);
    
    // Set the CSRF token in the request header
    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
    ajax_request.send(form_data);

    ajax_request.onreadystatechange = function() {
        if(ajax_request.readyState == 4 && ajax_request.status == 200) {
            var results = JSON.parse(ajax_request.responseText);
            if (results.error.length > 0) {
                message_container.innerHTML = '<div class="error-message"><b>Error: </b> ' + results.error + '</div>';
                manage_buttons_container.style.display = "none";
                customers_table.style.display = "none";
            } else {
                databaseData = results.data;
                displayTable();

                const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));

                document.querySelectorAll('#customers-table thead tr th').forEach(tb => {
                    tb.addEventListener('click', sortTable, false);
                });

                // Add event listener for all the elements with edit-btn class
                edit_btns.forEach(edit_btn => {
                    edit_btn.addEventListener('click', function handleClick(event) {
                        manageCustomersModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
                    });
                });

            }
        }
    }

    if (width >= 1280) {
        main_content.style.marginLeft = "250px";
        side_navigation_bar.style.width = "250px";
        navigation_bar.style.marginLeft = "250px";
    }
}
