const manage_outbounds_data_modal = document.getElementById("manage-outbounds-modal");
const delete_confirmation_modal = document.getElementById("delete-confirmation-modal");
const form_outbounds_data_add_btn_container = document.getElementById("form-outbounds-data-add-btn-container");
const form_outbounds_data_update_delete_btns_container = document.getElementById("form-outbounds-data-update-delete-btns-container");
const message_container = document.getElementById("message-container");
const manage_outbounds_data_modal_error_container = document.getElementById("manage-outbounds-data-modal-error-container");
const manage_outbounds_data_modal_content = document.getElementById("manage-outbounds-data-modal-content");
const table_filter_input = document.getElementById("table-filter-input");
const manage_buttons_container = document.getElementById("manage_buttons_container");

const form_id = document.getElementById("form-id");
const form_id_error = document.getElementById("form-id-error");
const form_reference = document.getElementById("form-reference");
const form_reference_error = document.getElementById("form-reference-error");
const form_date_received = document.getElementById("form-date-received");
const form_date_received_error = document.getElementById("form-date-received-error");
const form_product_sku = document.getElementById("form-product-sku");
const form_product_sku_error = document.getElementById("form-product-sku-error");
const form_quantity = document.getElementById("form-quantity");
const form_quantity_error = document.getElementById("form-quantity-error");
const form_destination = document.getElementById("form-destination");
const form_destination_error = document.getElementById("form-destination-error");
const form_remarks = document.getElementById("form-remarks");
const form_remarks_error = document.getElementById("form-remarks-error");
const form_customer_id = document.getElementById("form-customer-id");
const form_customer_id_error = document.getElementById("form-customer-id-error");
const add_btn = document.getElementById("add-btn");
const submit_add_btn = document.getElementById("submit-add-btn");
const update_btn = document.getElementById("update-btn");
const delete_btn = document.getElementById("delete-btn");
const outbound_table_tbody = document.getElementById("outbound-table-tbody");
const outbound_table = document.getElementById("outbound-table");

var letters = /^[a-zA-Z ]+$/;
var numbers = /^[0-9]+$/;
var date_time_local_timestamp = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/;
var alphanumeric = /^[0-9a-zA-Z ]+$/;
var password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;

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
            manageOutboundsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
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
            manageOutboundsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });

}

document.querySelector('#next-btn').addEventListener('click', nextSection, false);
document.querySelector('#previous-btn').addEventListener('click', previousSection, false);


function manageOutboundsModalAllow(id, className) {

    if (className === "edit-btn") {

        // Allow update and delete buttons
        form_outbounds_data_update_delete_btns_container.style.display = "flex";
        form_outbounds_data_update_delete_btns_container.style.justifyContent = "flex-end";
        form_outbounds_data_add_btn_container.style.display = "none";

        form_id.disabled = true;
        form_id.style.border = "2px solid grey";
        form_reference.disabled = true;
        form_reference.style.border = "2px solid grey";
        form_date_received.disabled = true;
        form_date_received.style.border = "2px solid grey";
        form_product_sku.disabled = true;
        form_product_sku.style.border = "2px solid grey";
        form_quantity.disabled = true;
        form_quantity.style.border = "2px solid grey";
        form_destination.disabled = true;
        form_destination.style.border = "2px solid grey";
        form_remarks.disabled = true;
        form_remarks.style.border = "2px solid grey";
        form_customer_id.disabled = true;
        form_customer_id.style.border = "2px solid grey";

        manage_outbounds_data_modal_error_container.innerHTML = '';


        const form_data = new FormData();

        form_data.append("id", id);
        form_data.append("edit-btn", "");

        var ajax_request = new XMLHttpRequest();
        // Get the CSRF token from the cookie
        const csrftoken = getCookie('csrftoken');
        ajax_request.open('POST', submitOutboundDataURL);
        
        // Set the CSRF token in the request header
        ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
        ajax_request.send(form_data);

        ajax_request.onreadystatechange = function() {
            if(ajax_request.readyState == 4 && ajax_request.status == 200) {
                form_reference.disabled = false;
                form_date_received.disabled = false;
                form_product_sku.disabled = false;
                form_quantity.disabled = false;
                form_destination.disabled = false;
                form_remarks.disabled = false;
                form_customer_id.disabled = false;

                var results = JSON.parse(ajax_request.responseText);

                if(results.error && results.error.length > 0) {
                    // Display based on events
                    message_container.innerHTML = '<div class="error-message"><b>Error: </b> ' + results.error + '</div>';
                } else {

                    manage_outbounds_data_modal.style.display = "block";

                    // Display based on events
                    form_id.value = results.id;
                    form_reference.value = results.reference;
                    form_date_received.value = results.dateReceived;
                    form_product_sku.value = results.productSKU;
                    form_quantity.value = results.quantity;
                    form_destination.value = results.destination;
                    form_remarks.value = results.remarks;
                    form_customer_id.value = results.customerID;
                }
            }
        }

    } else if (className === "add-btn") {

        // Allow add button
        form_outbounds_data_add_btn_container.style.display = "flex";
        form_outbounds_data_add_btn_container.style.justifyContent = "flex-end";
        form_outbounds_data_update_delete_btns_container.style.display = "none";

        manage_outbounds_data_modal_error_container.innerHTML = '';

        // Outbound ID has to be disabled. Default value set in the database.
        form_id.value = "";
        form_id.disabled = true;
        form_id.style.border = "2px solid grey";
        form_reference.value = "OUTBOUND";
        form_reference.disabled = false;
        form_reference.style.border = "2px solid grey";
        form_date_received.value = "";
        form_date_received.disabled = false;
        form_date_received.style.border = "2px solid grey";
        form_product_sku.value = "PRD";
        form_product_sku.disabled = false;
        form_product_sku.style.border = "2px solid grey";
        form_quantity.value = "";
        form_quantity.disabled = false;
        form_quantity.style.border = "2px solid grey";
        form_destination.value = "";
        form_destination.disabled = false;
        form_destination.style.border = "2px solid grey";
        form_remarks.value = "";
        form_remarks.disabled = false;
        form_remarks.style.border = "2px solid grey";
        form_customer_id.selectedIndex = -1;
        form_customer_id.disabled = false;
        form_customer_id.style.border = "2px solid grey";

        // Display the modal popup
        manage_outbounds_data_modal.style.display = "block";
    }
}

function addOutboundsData() {

    // Validate Reference
    if (!(form_reference.value.length > 0 && form_reference.value.length <= 15)) {
        form_reference_error.innerText = "Enter a valid value for Reference field.";
        form_reference.focus();
        form_reference.style.border = "2px solid red";
    } else {
        if (!form_reference.value.match(alphanumeric)) {
            form_reference_error.innerText = "Enter only alphanumeric characters for Reference field.";
            form_reference.focus();
            form_reference.style.border = "2px solid red";
        } else {
            form_reference_error.innerText = "";
            form_reference.style.border = "2px solid green";

            // Validate Date Received (Assuming it's a date input)
            // You may need to adjust the validation based on your date input format
            const dateReceived = new Date(form_date_received.value);
            if (isNaN(dateReceived.getTime())) {
                form_date_received_error.innerText = "Enter a valid date for Date Received field.";
                form_date_received.focus();
                form_date_received.style.border = "2px solid red";
            } else {
                form_date_received_error.innerText = "";
                form_date_received.style.border = "2px solid green";

                // Validate Product SKU
                if (!(form_product_sku.value.length > 0 && form_product_sku.value.length <= 10)) {
                    form_product_sku_error.innerText = "Enter a valid value for Product SKU field.";
                    form_product_sku.focus();
                    form_product_sku.style.border = "2px solid red";
                } else {
                    form_product_sku_error.innerText = "";
                    form_product_sku.style.border = "2px solid green";

                    // Validate Quantity
                    if (isNaN(form_quantity.value) || form_quantity.value <= 0) {
                        form_quantity_error.innerText = "Enter a valid quantity for Quantity field.";
                        form_quantity.focus();
                        form_quantity.style.border = "2px solid red";
                    } else {
                        form_quantity_error.innerText = "";
                        form_quantity.style.border = "2px solid green";

                        // Validate destination
                        if (!(form_destination.value.length > 0 && form_destination.value.length <= 150)) {
                            form_destination_error.innerText = "Enter a valid value for Destination field.";
                            form_destination.focus();
                            form_destination.style.border = "2px solid red";
                        } else {
                            form_destination_error.innerText = "";
                            form_destination.style.border = "2px solid green";

                            // Validate Remarks
                            if (!(form_remarks.value.length <= 250)) {
                                form_remarks_error.innerText = "Enter a valid value for Remarks field.";
                                form_remarks.focus();
                                form_remarks.style.border = "2px solid red";
                            } else {
                                form_remarks_error.innerText = "";
                                form_remarks.style.border = "2px solid green";

                                // Validate customer ID (Assuming it's a dropdown)
                                if (form_customer_id.selectedIndex === 0) {
                                    form_customer_id_error.innerText = "Select a valid customer for Customer ID field.";
                                    form_customer_id.focus();
                                    form_customer_id.style.border = "2px solid red";
                                } else {
                                    form_customer_id_error.innerText = "";
                                    form_customer_id.style.border = "2px solid green";

                                    // Disable
                                    form_reference.disabled = true;
                                    form_date_received.disabled = true;
                                    form_product_sku.disabled = true;
                                    form_quantity.disabled = true;
                                    form_destination.disabled = true;
                                    form_remarks.disabled = true;
                                    form_customer_id.disabled = true;
                                    submit_add_btn.disabled = true;
                                    submit_add_btn.innerText = "Loading ...";

                                    const form_data = new FormData();

                                    form_data.append("reference", form_reference.value);
                                    form_data.append("date-received", form_date_received.value);
                                    form_data.append("product-sku", form_product_sku.value);
                                    form_data.append("quantity", form_quantity.value);
                                    form_data.append("destination", form_destination.value);
                                    form_data.append("remarks", form_remarks.value);
                                    form_data.append("customer-id", form_customer_id.value);
                                    form_data.append("submit-add-btn", "");

                                    var ajax_request = new XMLHttpRequest();
                                    // Get the CSRF token from the cookie
                                    const csrftoken = getCookie('csrftoken');
                                    ajax_request.open('POST', submitOutboundDataURL);
                                    
                                    // Set the CSRF token in the request header
                                    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
                                    ajax_request.send(form_data);

                                    ajax_request.onreadystatechange = function () {
                                        if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                                            // Enable
                                            form_reference.disabled = false;
                                            form_date_received.disabled = false;
                                            form_product_sku.disabled = false;
                                            form_quantity.disabled = false;
                                            form_destination.disabled = false;
                                            form_remarks.disabled = false;
                                            form_customer_id.disabled = false;
                                            submit_add_btn.disabled = false;
                                            submit_add_btn.innerText = "Submit";

                                            try {
                                                var results = JSON.parse(ajax_request.responseText);

                                                if (results.error && results.error.length > 0) {
                                                    // Display based on events
                                                    manage_outbounds_data_modal_content.scrollTop = 0;
                                                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                                                }
                                                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                                                    // Display based on events
                                                    manage_outbounds_data_modal_content.scrollTop = 0;
                                                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                                                }
                                                if (results.success && results.success.length > 0) {
                                                    // Display based on events
                                                    manage_outbounds_data_modal_content.scrollTop = 0;
                                                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refreshing page in 3 seconds.</div>';

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
            }
        }
    }
}

function updateOutboundsData() {
    form_id.style.border = "2px solid green";

    // Validate Reference
    if (!(form_reference.value.length > 0 && form_reference.value.length <= 15)) {
        form_reference_error.innerText = "Enter a valid value for Reference field.";
        form_reference.focus();
        form_reference.style.border = "2px solid red";
    } else {
        if (!form_reference.value.match(alphanumeric)) {
            form_reference_error.innerText = "Enter only alphanumeric characters for Reference field.";
            form_reference.focus();
            form_reference.style.border = "2px solid red";
        } else {
            form_reference_error.innerText = "";
            form_reference.style.border = "2px solid green";

            // Validate Date Received (Assuming it's a date input)
            // You may need to adjust the validation based on your date input format
            const dateReceived = new Date(form_date_received.value);
            if (isNaN(dateReceived.getTime())) {
                form_date_received_error.innerText = "Enter a valid date for Date Received field.";
                form_date_received.focus();
                form_date_received.style.border = "2px solid red";
            } else {
                form_date_received_error.innerText = "";
                form_date_received.style.border = "2px solid green";

                // Validate Product SKU
                if (!(form_product_sku.value.length > 0 && form_product_sku.value.length <= 10)) {
                    form_product_sku_error.innerText = "Enter a valid value for Product SKU field.";
                    form_product_sku.focus();
                    form_product_sku.style.border = "2px solid red";
                } else {
                    form_product_sku_error.innerText = "";
                    form_product_sku.style.border = "2px solid green";

                    // Validate Quantity
                    if (isNaN(form_quantity.value) || form_quantity.value <= 0) {
                        form_quantity_error.innerText = "Enter a valid quantity for Quantity field.";
                        form_quantity.focus();
                        form_quantity.style.border = "2px solid red";
                    } else {
                        form_quantity_error.innerText = "";
                        form_quantity.style.border = "2px solid green";

                        // Validate destination
                        if (!(form_destination.value.length > 0 && form_destination.value.length <= 150)) {
                            form_destination_error.innerText = "Enter a valid value for Destination field.";
                            form_destination.focus();
                            form_destination.style.border = "2px solid red";
                        } else {
                            form_destination_error.innerText = "";
                            form_destination.style.border = "2px solid green";

                            // Validate Remarks
                            if (!(form_remarks.value.length <= 250)) {
                                form_remarks_error.innerText = "Enter a valid value for Remarks field.";
                                form_remarks.focus();
                                form_remarks.style.border = "2px solid red";
                            } else {
                                form_remarks_error.innerText = "";
                                form_remarks.style.border = "2px solid green";

                                // Validate customer ID (Assuming it's a dropdown)
                                if (form_customer_id.selectedIndex === 0) {
                                    form_customer_id_error.innerText = "Select a valid customer for Customer ID field.";
                                    form_customer_id.focus();
                                    form_customer_id.style.border = "2px solid red";
                                } else {
                                    form_customer_id_error.innerText = "";
                                    form_customer_id.style.border = "2px solid green";

                                    // Disable
                                    form_id.disabled = true;
                                    form_reference.disabled = true;
                                    form_date_received.disabled = true;
                                    form_customer_id.disabled = true;
                                    form_product_sku.disabled = true;
                                    form_quantity.disabled = true;
                                    form_destination.disabled = true;
                                    form_remarks.disabled = true;
                                    update_btn.disabled = true;
                                    update_btn.innerText = "Loading ...";

                                    const form_data = new FormData();

                                    form_data.append("id", form_id.value);
                                    form_data.append("reference", form_reference.value);
                                    form_data.append("date-received", form_date_received.value);
                                    form_data.append("customer-id", form_customer_id.value);
                                    form_data.append("product-sku", form_product_sku.value);
                                    form_data.append("quantity", form_quantity.value);
                                    form_data.append("destination", form_destination.value);
                                    form_data.append("remarks", form_remarks.value);
                                    form_data.append("update-btn", "");

                                    var ajax_request = new XMLHttpRequest();
                                    // Get the CSRF token from the cookie
                                    const csrftoken = getCookie('csrftoken');
                                    ajax_request.open('POST', submitOutboundDataURL);
                                    
                                    // Set the CSRF token in the request header
                                    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
                                    ajax_request.send(form_data);

                                    ajax_request.onreadystatechange = function () {
                                        if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                                            // Enable
                                            form_reference.disabled = false;
                                            form_date_received.disabled = false;
                                            form_customer_id.disabled = false;
                                            form_product_sku.disabled = false;
                                            form_quantity.disabled = false;
                                            form_destination.disabled = false;
                                            form_remarks.disabled = false;
                                            update_btn.disabled = false;
                                            update_btn.innerHTML = '<i class="fa fa-edit"></i> Update';

                                            try {
                                                var results = JSON.parse(ajax_request.responseText);

                                                if (results.error && results.error.length > 0) {
                                                    // Display based on events
                                                    manage_outbounds_data_modal_content.scrollTop = 0;
                                                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                                                }
                                                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                                                    // Display based on events
                                                    manage_outbounds_data_modal_content.scrollTop = 0;
                                                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                                                }
                                                if (results.success && results.success.length > 0) {
                                                    // Display based on events
                                                    manage_outbounds_data_modal_content.scrollTop = 0;
                                                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refreshing page in 3 seconds.</div>';

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
            }
        }
    }
}

function deleteOutboundsData() {
    // Disable
    form_id.disabled = true;
    form_date_received.disabled = true;
    form_customer_id.disabled = true;
    form_product_sku.disabled = true;
    form_quantity.disabled = true;
    form_destination.disabled = true;
    form_remarks.disabled = true;
    delete_btn.disable = true;
    update_btn.disable = true;
    delete_btn.innerText = "Loading ...";
    
    const form_data = new FormData();
    
    form_data.append("id", form_id.value);
    form_data.append("delete-btn", "");

    var ajax_request = new XMLHttpRequest();
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    ajax_request.open('POST', submitOutboundDataURL);
    
    // Set the CSRF token in the request header
    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
    ajax_request.send(form_data);
    
    ajax_request.onreadystatechange = function() {
        if(ajax_request.readyState == 4 && ajax_request.status == 200) {
            // Enable
            form_id.disabled = true;
            form_date_received.disabled = false;
            form_customer_id.disabled = false;
            form_product_sku.disabled = false;
            form_quantity.disabled = false;
            form_destination.disabled = false;
            form_remarks.disabled = false;
            update_btn.disable = false;
            delete_btn.disable = false;
            delete_btn.innerHTML = '<i class="fa fa-times"></i> Delete';


            try {
                var results = JSON.parse(ajax_request.responseText);

                if (results.error && results.error.length > 0) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_outbounds_data_modal_content.scrollTop = 0;
                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                }
                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_outbounds_data_modal_content.scrollTop = 0;
                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                } 
                if (results.success && results.success.length > 0) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_outbounds_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refresing page in 3 seconds.</div>';

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
        if (manage_outbounds_data_modal.style.display === "block") {
            manage_outbounds_data_modal.style.display = "none";
        }
    }
};

window.onclick = (event) => {
    if (event.target == manage_outbounds_data_modal) {
        manage_outbounds_data_modal.style.display = "none";
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

function manageOutboundsModalClose() {
    if (manage_outbounds_data_modal.style.display === "block") {
        manage_outbounds_data_modal.style.display = "none";
    }
}


// Add event listener for add-btn class. The -1 does not have a real meaning. It is just for putting a value as the parameter requires an argument here.
add_btn.addEventListener('click', function handleClick(event) {
    manageOutboundsModalAllow("-1", this.className);
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
            manageOutboundsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });
}

function filterTable() {
    displayTable();

    const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));
    // Add event listener for all the elements with edit-btn class
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', function handleClick(event) {
            manageOutboundsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
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
                if (table_filter_input.value.length > 0 && (rowSection.id.toString().includes(table_filter_input.value) || rowSection.reference.includes(table_filter_input.value) || rowSection.date_received.includes(table_filter_input.value) || rowSection.product_sku.includes(table_filter_input.value) || rowSection.quantity.toString().includes(table_filter_input.value) || rowSection.destination.includes(table_filter_input.value) || rowSection.remarks.includes(table_filter_input.value) || rowSection.customer_id_id.toString().includes(table_filter_input.value))) {
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
            <tr data-id='${dt.id}'>
            <td>${dt.id}</td>
            <td>${dt.product_sku}</td>
            <td>${dt.quantity}</td>
            <td>${dt.reference}</td>
            <td>${dt.destination}</td>
            <td>${dt.customer_id_id}</td>
            <td>${dt.date_received}</td>
            <td><button type="button" class="edit-btn">
                    <i class="fa fa-edit"></i> Edit
                </button></td>
            </tr>
        </tbody>`;
    });

    outbound_table_tbody.innerHTML = results;
}

// Function to get the CSRF token from the cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function loadPage() {
    const form_data = new FormData();
    form_data.append("fetch-outbound-data", "");

    var ajax_request = new XMLHttpRequest();
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    ajax_request.open('POST', fetchOutboundDataURL);
    
    // Set the CSRF token in the request header
    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
    ajax_request.send(form_data);

    ajax_request.onreadystatechange = function() {
        if(ajax_request.readyState == 4 && ajax_request.status == 200) {
            var results = JSON.parse(ajax_request.responseText);
            if (results.error.length > 0) {
                message_container.innerHTML = '<div class="error-message"><b>Error: </b> ' + results.error + '</div>';
                manage_buttons_container.style.display = "none";
                outbound_table.style.display = "none";
            } else {
                databaseData = results.data;
                displayTable();

                const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));

                document.querySelectorAll('#outbound-table thead tr th').forEach(tb => {
                    tb.addEventListener('click', sortTable, false);
                });

                // Add event listener for all the elements with edit-btn class
                edit_btns.forEach(edit_btn => {
                    edit_btn.addEventListener('click', function handleClick(event) {
                        manageOutboundsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
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
