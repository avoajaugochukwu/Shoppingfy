from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()

router.register('orders', OrderView, basename='order')
router.register(r'carts', CartView, basename='cart')
router.register(r'categories', CategoryView, basename='category')
# router.register('customers', CustomerView, basename='customer')
router.register(r'products', ProductView, basename='product')
# router.register('seller', SellerView, basename='seller')
router.register('address', AddressView, basename='address')
router.register('user_address', UserAddressView, basename='user_address')

urlpatterns = [
    path('', include(router.urls)),
]