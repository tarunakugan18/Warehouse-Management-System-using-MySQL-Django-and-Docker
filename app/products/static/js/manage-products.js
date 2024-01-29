const manage_products_data_modal = document.getElementById("manage-products-modal");
const delete_confirmation_modal = document.getElementById("delete-confirmation-modal");
const form_products_data_add_btn_container = document.getElementById("form-products-data-add-btn-container");
const form_products_data_update_delete_btns_container = document.getElementById("form-products-data-update-delete-btns-container");
const message_container = document.getElementById("message-container");
const manage_products_data_modal_error_container = document.getElementById("manage-products-data-modal-error-container");
const manage_products_data_modal_content = document.getElementById("manage-products-data-modal-content");
const table_filter_input = document.getElementById("table-filter-input");
const manage_buttons_container = document.getElementById("manage_buttons_container");

const form_product_sku = document.getElementById("form-product-sku");
const form_product_sku_error = document.getElementById("form-product-sku-error");
const form_name = document.getElementById("form-name");
const form_name_error = document.getElementById("form-name-error");
const form_description = document.getElementById("form-description");
const form_description_error = document.getElementById("form-description-error");
const form_price = document.getElementById("form-price");
const form_price_error = document.getElementById("form-price-error");
const form_quantity = document.getElementById("form-quantity");
const form_quantity_error = document.getElementById("form-quantity-error");
const add_btn = document.getElementById("add-btn");
const submit_add_btn = document.getElementById("submit-add-btn");
const update_btn = document.getElementById("update-btn");
const delete_btn = document.getElementById("delete-btn");
const products_table_tbody = document.getElementById("products-table-tbody");
const products_table = document.getElementById("products-table");

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
            manageProductsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
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
            manageProductsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });

}

document.querySelector('#next-btn').addEventListener('click', nextSection, false);
document.querySelector('#previous-btn').addEventListener('click', previousSection, false);


function manageProductsModalAllow(id, className) {

    if (className === "edit-btn") {

        // Allow update and delete buttons
        form_products_data_update_delete_btns_container.style.display = "flex";
        form_products_data_update_delete_btns_container.style.justifyContent = "flex-end";
        form_products_data_add_btn_container.style.display = "none";

        form_product_sku.disabled = true;
        form_product_sku.style.border = "2px solid grey";
        form_name.disabled = true;
        form_name.style.border = "2px solid grey";
        form_description.disabled = true;
        form_description.style.border = "2px solid grey";
        form_price.disabled = true;
        form_price.style.border = "2px solid grey";
        form_quantity.disabled = true;
        form_quantity.style.border = "2px solid grey";

        manage_products_data_modal_error_container.innerHTML = '';


        const form_data = new FormData();

        form_data.append("product-sku", id);
        form_data.append("edit-btn", "");

        var ajax_request = new XMLHttpRequest();
        // Get the CSRF token from the cookie
        const csrftoken = getCookie('csrftoken');
        ajax_request.open('POST', submitProductsDataURL);
        
        // Set the CSRF token in the request header
        ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
        ajax_request.send(form_data);

        ajax_request.onreadystatechange = function() {
            if(ajax_request.readyState == 4 && ajax_request.status == 200) {
                form_product_sku.disabled = false;
                form_name.disabled = false;
                form_description.disabled = false;
                form_price.disabled = false;
                form_quantity.disabled = false;

                var results = JSON.parse(ajax_request.responseText);

                if(results.error && results.error.length > 0) {
                    // Display based on events
                    message_container.innerHTML = '<div class="error-message"><b>Error: </b> ' + results.error + '</div>';
                } else {

                    manage_products_data_modal.style.display = "block";

                    // Display based on events
                    form_product_sku.value = results.productSKU;
                    form_name.value = results.name;
                    form_description.value = results.description;
                    form_price.value = results.price;
                    form_quantity.value = results.quantity;
                }
            }
        }

    } else if (className === "add-btn") {

        // Allow add button
        form_products_data_add_btn_container.style.display = "flex";
        form_products_data_add_btn_container.style.justifyContent = "flex-end";
        form_products_data_update_delete_btns_container.style.display = "none";

        manage_products_data_modal_error_container.innerHTML = '';

        // Product SKU has to be disabled. Default value set in the database.
        form_product_sku.value = "PRD";
        form_product_sku.disabled = false;
        form_product_sku.style.border = "2px solid grey";
        form_name.value = "";
        form_name.disabled = false;
        form_name.style.border = "2px solid grey";
        form_description.value = "";
        form_description.disabled = false;
        form_description.style.border = "2px solid grey";
        form_price.value = "PRD";
        form_price.disabled = false;
        form_price.style.border = "2px solid grey";
        form_quantity.value = "";
        form_quantity.disabled = false;
        form_quantity.style.border = "2px solid grey";

        // Display the modal popup
        manage_products_data_modal.style.display = "block";
    }
}

function addProductsData() {

    // Validate Reference
    if (!(form_product_sku.value.length > 0 && form_product_sku.value.length <= 15)) {
        form_product_sku_error.innerText = "Enter a valid value for Product SKU field.";
        form_product_sku.focus();
        form_product_sku.style.border = "2px solid red";
    } else {
        if (!form_product_sku.value.match(alphanumeric)) {
            form_product_sku_error.innerText = "Enter only alphanumeric characters for Product SKU field.";
            form_product_sku.focus();
            form_product_sku.style.border = "2px solid red";
        } else {
            form_product_sku_error.innerText = "";
            form_product_sku.style.border = "2px solid green";

            // Validate Name
            if (!(form_name.value.length > 0 && form_name.value.length <= 200)) {
                form_name_error.innerText = "Enter a valid value for Name field.";
                form_name.focus();
                form_name.style.border = "2px solid red";
            } else {
                form_name_error.innerText = "";
                form_name.style.border = "2px solid green";

                if (!(form_description.value.length > 0 && form_description.value.length <= 500)) {
                    form_description_error.innerText = "Enter a valid value for Description field.";
                    form_description.focus();
                    form_description.style.border = "2px solid red";
                } else {
                    form_description_error.innerText = "";
                    form_description.style.border = "2px solid green";

                    if (isNaN(form_price.value) || form_price.value <= 0) {
                        form_price_error.innerText = "Enter a valid value for Price field.";
                        form_price.focus();
                        form_price.style.border = "2px solid red";
                    } else {
                        form_price_error.innerText = "";
                        form_price.style.border = "2px solid green";

                        // Validate Quantity
                        if (isNaN(form_quantity.value) || form_quantity.value <= 0) {
                            form_quantity_error.innerText = "Enter a valid quantity for Quantity field.";
                            form_quantity.focus();
                            form_quantity.style.border = "2px solid red";
                        } else {
                            form_quantity_error.innerText = "";
                            form_quantity.style.border = "2px solid green";
                        
                            // Disable
                            form_product_sku.disabled = true;
                            form_name.disabled = true;
                            form_description.disabled = true;
                            form_price.disabled = true;
                            form_quantity.disabled = true;
                            submit_add_btn.disabled = true;
                            submit_add_btn.innerText = "Loading ...";

                            const form_data = new FormData();

                            form_data.append("product-sku", form_product_sku.value);
                            form_data.append("name", form_name.value);
                            form_data.append("description", form_description.value);
                            form_data.append("price", form_price.value);
                            form_data.append("quantity", form_quantity.value);
                            form_data.append("submit-add-btn", "");

                            var ajax_request = new XMLHttpRequest();
                            // Get the CSRF token from the cookie
                            const csrftoken = getCookie('csrftoken');
                            ajax_request.open('POST', submitProductsDataURL);
                            
                            // Set the CSRF token in the request header
                            ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
                            ajax_request.send(form_data);

                            ajax_request.onreadystatechange = function () {
                                if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                                    // Enable
                                    form_product_sku.disabled = false;
                                    form_name.disabled = false;
                                    form_description.disabled = false;
                                    form_price.disabled = false;
                                    form_quantity.disabled = false;
                                    submit_add_btn.disabled = false;
                                    submit_add_btn.innerText = "Submit";

                                    try {
                                        var results = JSON.parse(ajax_request.responseText);

                                        if (results.error && results.error.length > 0) {
                                            // Display based on events
                                            manage_products_data_modal_content.scrollTop = 0;
                                            manage_products_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                                        }
                                        if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                                            // Display based on events
                                            manage_products_data_modal_content.scrollTop = 0;
                                            manage_products_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                                        }
                                        if (results.success && results.success.length > 0) {
                                            // Display based on events
                                            manage_products_data_modal_content.scrollTop = 0;
                                            manage_products_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refreshing page in 3 seconds.</div>';

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

function updateProductsData() {
    form_product_sku.style.border = "2px solid green";

    if (!(form_name.value.length > 0 && form_name.value.length <= 200)) {
        form_name_error.innerText = "Enter a valid value for Name field.";
        form_name.focus();
        form_name.style.border = "2px solid red";
    } else {
        form_name_error.innerText = "";
        form_name.style.border = "2px solid green";

        if (!(form_description.value.length > 0 && form_description.value.length <= 500)) {
            form_description_error.innerText = "Enter a valid value for Description field.";
            form_description.focus();
            form_description.style.border = "2px solid red";
        } else {
            form_description_error.innerText = "";
            form_description.style.border = "2px solid green";

            if (isNaN(form_price.value) || form_price.value <= 0) {
                form_price_error.innerText = "Enter a valid value for Price field.";
                form_price.focus();
                form_price.style.border = "2px solid red";
            } else {
                form_price_error.innerText = "";
                form_price.style.border = "2px solid green";

                // Validate Quantity
                if (isNaN(form_quantity.value) || form_quantity.value <= 0) {
                    form_quantity_error.innerText = "Enter a valid quantity for Quantity field.";
                    form_quantity.focus();
                    form_quantity.style.border = "2px solid red";
                } else {
                    form_quantity_error.innerText = "";
                    form_quantity.style.border = "2px solid green";

                    // Disable
                    form_product_sku.disabled = true;
                    form_name.disabled = true;
                    form_description.disabled = true;
                    form_price.disabled = true;
                    form_quantity.disabled = true;
                    update_btn.disabled = true;
                    update_btn.innerText = "Loading ...";

                    const form_data = new FormData();

                    form_data.append("product-sku", form_product_sku.value);
                    form_data.append("name", form_name.value);
                    form_data.append("description", form_description.value);
                    form_data.append("price", form_price.value);
                    form_data.append("quantity", form_quantity.value);
                    form_data.append("update-btn", "");

                    var ajax_request = new XMLHttpRequest();
                    // Get the CSRF token from the cookie
                    const csrftoken = getCookie('csrftoken');
                    ajax_request.open('POST', submitProductsDataURL);
                    
                    // Set the CSRF token in the request header
                    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
                    ajax_request.send(form_data);

                    ajax_request.onreadystatechange = function () {
                        if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                            // Enable
                            form_product_sku.disabled = false;
                            form_name.disabled = false;
                            form_description.disabled = false;
                            form_price.disabled = false;
                            form_quantity.disabled = false;
                            update_btn.disabled = false;
                            update_btn.innerHTML = '<i class="fa fa-edit"></i> Update';

                            try {
                                var results = JSON.parse(ajax_request.responseText);

                                if (results.error && results.error.length > 0) {
                                    // Display based on events
                                    manage_products_data_modal_content.scrollTop = 0;
                                    manage_products_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                                }
                                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                                    // Display based on events
                                    manage_products_data_modal_content.scrollTop = 0;
                                    manage_products_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                                }
                                if (results.success && results.success.length > 0) {
                                    // Display based on events
                                    manage_products_data_modal_content.scrollTop = 0;
                                    manage_products_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refreshing page in 3 seconds.</div>';

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

function deleteProductsData() {
    // Disable
    form_product_sku.disabled = true;
    form_name.disabled = true;
    form_description.disabled = true;
    form_price.disabled = true;
    form_quantity.disabled = true;
    delete_btn.disable = true;
    update_btn.disable = true;
    delete_btn.innerText = "Loading ...";
    
    const form_data = new FormData();
    
    form_data.append("product-sku", form_product_sku.value);
    form_data.append("delete-btn", "");

    var ajax_request = new XMLHttpRequest();
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    ajax_request.open('POST', submitProductsDataURL);
    
    // Set the CSRF token in the request header
    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
    ajax_request.send(form_data);
    
    ajax_request.onreadystatechange = function() {
        if(ajax_request.readyState == 4 && ajax_request.status == 200) {
            // Enable
            form_product_sku.disabled = false;
            form_name.disabled = false;
            form_description.disabled = false;
            form_price.disabled = false;
            form_quantity.disabled = false;
            update_btn.disable = false;
            delete_btn.disable = false;
            delete_btn.innerHTML = '<i class="fa fa-times"></i> Delete';


            try {
                var results = JSON.parse(ajax_request.responseText);

                if (results.error && results.error.length > 0) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_products_data_modal_content.scrollTop = 0;
                    manage_products_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b>' + results.error + '</div>';
                }
                if ((results.error && results.error.length === 0) && (results.success && results.success.length === 0)) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_products_data_modal_content.scrollTop = 0;
                    manage_products_data_modal_error_container.innerHTML = '<div class="error-message"><b>Error: </b> Please refresh the page and try again.</div>';
                } 
                if (results.success && results.success.length > 0) {
                    // Display based on events
                    delete_confirmation_modal.style.display = "none";
                    manage_products_data_modal_error_container.innerHTML = '<div class="success-message"><b>Success: </b>' + results.success + ' Refresing page in 3 seconds.</div>';

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
        if (manage_products_data_modal.style.display === "block") {
            manage_products_data_modal.style.display = "none";
        }
    }
};

window.onclick = (event) => {
    if (event.target == manage_products_data_modal) {
        manage_products_data_modal.style.display = "none";
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

function manageProductsModalClose() {
    if (manage_products_data_modal.style.display === "block") {
        manage_products_data_modal.style.display = "none";
    }
}


// Add event listener for add-btn class. The -1 does not have a real meaning. It is just for putting a value as the parameter requires an argument here.
add_btn.addEventListener('click', function handleClick(event) {
    manageProductsModalAllow("-1", this.className);
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
            manageProductsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
        });
    });
}

function filterTable() {
    displayTable();

    const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));
    // Add event listener for all the elements with edit-btn class
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', function handleClick(event) {
            manageProductsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
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
                if (table_filter_input.value.length > 0 && (rowSection.product_sku.includes(table_filter_input.value) || rowSection.name.includes(table_filter_input.value) || rowSection.description.includes(table_filter_input.value) || rowSection.price.toString().includes(table_filter_input.value) || rowSection.quantity.toString().includes(table_filter_input.value))) {
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
            <tr data-id='${dt.product_sku}'>
            <td>${dt.product_sku}</td>
            <td>${dt.name}</td>
            <td>${dt.description}</td>
            <td>${dt.price}</td>
            <td>${dt.quantity}</td>
            <td><button type="button" class="edit-btn">
                    <i class="fa fa-edit"></i> Edit
                </button></td>
            </tr>
        </tbody>`;
    });

    products_table_tbody.innerHTML = results;
}

// Function to get the CSRF token from the cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function loadPage() {
    const form_data = new FormData();
    form_data.append("fetch-products-data", "");

    var ajax_request = new XMLHttpRequest();
    // Get the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');
    ajax_request.open('POST', fetchProductsDataURL);
    
    // Set the CSRF token in the request header
    ajax_request.setRequestHeader('X-CSRFToken', csrftoken);
    ajax_request.send(form_data);

    ajax_request.onreadystatechange = function() {
        if(ajax_request.readyState == 4 && ajax_request.status == 200) {
            var results = JSON.parse(ajax_request.responseText);
            if (results.error.length > 0) {
                message_container.innerHTML = '<div class="error-message"><b>Error: </b> ' + results.error + '</div>';
                manage_buttons_container.style.display = "none";
                products_table.style.display = "none";
            } else {
                databaseData = results.data;
                displayTable();

                const edit_btns = Array.from(document.getElementsByClassName("edit-btn"));

                document.querySelectorAll('#products-table thead tr th').forEach(tb => {
                    tb.addEventListener('click', sortTable, false);
                });

                // Add event listener for all the elements with edit-btn class
                edit_btns.forEach(edit_btn => {
                    edit_btn.addEventListener('click', function handleClick(event) {
                        manageProductsModalAllow(this.parentElement.parentElement.getAttribute("data-id"), this.className);
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
