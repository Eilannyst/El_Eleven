from django.urls import path
from main.views import (
    show_main, create_product, show_product, show_xml, show_json, 
    show_xml_by_id, show_json_by_id, register, login_user, logout_user, 
    edit_product, delete_product, get_products_json, get_product_json_by_id,
    create_product_ajax, edit_product_ajax, delete_product_ajax,
    register_ajax, login_user_ajax, logout_user_ajax
)

app_name = 'main'

urlpatterns = [
    path('', show_main, name='show_main'),
    path('create-product/', create_product, name='create_product'),
    path('product/<int:id>/', show_product, name='show_product'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<int:product_id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:product_id>/', show_json_by_id, name='show_json_by_id'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('edit-product/<int:id>/', edit_product, name='edit_product'), 
    path('delete-product/<int:id>/', delete_product, name='delete_product'),
    path('get-products-json/', get_products_json, name='get_products_json'),
    path('get-product-json/<int:product_id>/', get_product_json_by_id, name='get_product_json_by_id'),
    path('create-product-ajax/', create_product_ajax, name='create_product_ajax'),
    path('edit-product-ajax/<int:id>/', edit_product_ajax, name='edit_product_ajax'),
    path('delete-product-ajax/<int:id>/', delete_product_ajax, name='delete_product_ajax'),
    path('register-ajax/', register_ajax, name='register_ajax'),
    path('login-ajax/', login_user_ajax, name='login_ajax'),
    path('logout-ajax/', logout_user_ajax, name='logout_ajax'),
]