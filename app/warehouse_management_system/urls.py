"""
URL configuration for warehouse_management_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# # from django.contrib import admin
# from django.urls import path, include
# from core.views import user_logout
# from outbounds.views import customers

# urlpatterns = [
#     # path('admin/', admin.site.urls),
#     path("", include(("core.urls", "core"), namespace="core")),
#     path("logout/", user_logout, name="user_logout"),   
#     path("warehouse-manager/", include(("inbounds.urls", "inbounds"), namespace = "inbounds")),
#     path("warehouse-manager/manage-inbounds/", include("inbounds.urls", namespace = "inbounds_warehouse_manager")),
#     path("warehouse-manager/manage-suppliers/", include("inbounds.urls", namespace = "inbounds_suppliers")),
#     path("warehouse-manager/manage-outbounds/", include("outbounds.urls", namespace = "outbounds")),
#     path("warehouse-manager/manage-customers/", customers, name="customers"),
#     path("warehouse-manager/manage-products/", include("products.urls", namespace = "products")),
#     path("warehouse-manager/manage-operators/", include("users.urls", namespace = "users")),
# ]







from django.urls import path, include
from core.views import home, user_logout

from inbounds.views import inbounds, fetch_inbound_data, manage_inbound_data, suppliers, fetch_suppliers_data, manage_suppliers_data

from outbounds.views import outbounds, fetch_outbound_data, manage_outbound_data, customers, fetch_customers_data,manage_customers_data

from products.views import products, fetch_products_data, manage_products_data
from users.views import operators, fetch_operators_data, manage_operators_data


urlpatterns = [
    path("", home, name="home"),
    path("logout/", user_logout, name="user_logout"),   
    # path("warehouse-manager/", inbound, name="inbound"),
    path("warehouse-manager/manage-inbounds/", inbounds, name="inbounds"),
    path("warehouse-manager/manage-customers/", customers, name="customers"),
    path("warehouse-manager/manage-suppliers/", suppliers, name = "suppliers"),
    path("warehouse-manager/manage-outbounds/", outbounds, name="outbounds"),
    path("warehouse-manager/manage-products/", products, name="products"),
    path("warehouse-manager/manage-operators/", operators, name="operators"),
    path("warehouse-manager/manage-inbounds/fetch-inbound-data/", fetch_inbound_data, name="fetch_inbound_data"),
    path("warehouse-manager/manage-inbounds/manage-inbound-data/", manage_inbound_data, name="manage_inbound_data"),
    path("warehouse-manager/manage-inbounds/fetch-suppliers-data/", fetch_suppliers_data, name="fetch_suppliers_data"),
    path("warehouse-manager/manage-inbounds/manage-suppliers-data/", manage_suppliers_data, name="manage_suppliers_data"),
    path("warehouse-manager/manage-outbounds/fetch-outbound-data/", fetch_outbound_data, name="fetch_outbound_data"),
    path("warehouse-manager/manage-outbounds/manage-outbound-data/", manage_outbound_data, name="manage_outbound_data"),
    path("warehouse-manager/manage-outbounds/fetch-customers-data/", fetch_customers_data, name="fetch_customers_data"),
    path("warehouse-manager/manage-outbounds/manage-customers-data/", manage_customers_data, name="manage_customers_data"),
    path("warehouse-manager/manage-products/fetch-products-data/", fetch_products_data, name="fetch_products_data"),
    path("warehouse-manager/manage-products/manage-products-data/", manage_products_data, name="manage_products_data"),
    path("warehouse-manager/manage-operators/fetch-operators-data/", fetch_operators_data, name="fetch_operators_data"),
    path("warehouse-manager/manage-operators/manage-operators-data/", manage_operators_data, name="manage_operators_data"),
    path("operator/manage-inbounds/", inbounds, name="inbounds"),
    path("operator/manage-outbounds/", outbounds, name="outbounds"),
    path("operator/manage-inbounds/fetch-inbound-data/", fetch_inbound_data, name="fetch_inbound_data"),
    path("operator/manage-inbounds/manage-inbound-data/", manage_inbound_data, name="manage_inbound_data"),
    path("operator/manage-inbounds/fetch-suppliers-data/", fetch_suppliers_data, name="fetch_suppliers_data"),
    path("operator/manage-inbounds/manage-suppliers-data/", manage_suppliers_data, name="manage_suppliers_data"),
    path("operator/manage-outbounds/fetch-outbound-data/", fetch_outbound_data, name="fetch_outbound_data"),
    path("operator/manage-outbounds/manage-outbound-data/", manage_outbound_data, name="manage_outbound_data"),
    path("operator/manage-outbounds/fetch-customers-data/", fetch_customers_data, name="fetch_customers_data"),
    path("operator/manage-outbounds/manage-customers-data/", manage_customers_data, name="manage_customers_data"),
]

