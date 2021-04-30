from rest_framework import generics, viewsets, permissions
from rest_framework import status
from rest_framework.response import Response
from .models import Category, Product, Cart, User, Order, Address
from .serializers import (CategorySerializer, ProductSerializer, CartSerializer, 
        OrderSerializer, AddressSerializer, UserAddressSerializer)


class CategoryView(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductView(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class CartView(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class OrderView(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class AddressView(viewsets.ModelViewSet):
    
    serializer_class = AddressSerializer
    def get_queryset(self):
        return Address.objects.all()
# {
#     'user': 1, 
#     'address': '19 Folashade Close, Off Falolu, Off Akerele, Surulere', 
#     'city': 'Ikeja', 
#     'phone': '07009000', 
#     'state': 'Lagos', 
#     'current': False
# }

    def create(self, request):
        user_id = request.data['user']
        user = User.objects.get(id=user_id)
        user_addresses = Address.objects.filter(user=user)

        # When a new address is created, find all that users' old addresses and make them non-current
        # This will ensure that we do not have more than 1 current address per user

        for i in user_addresses:
            i.current = False
            i.save()
        
        # Assign request data to variables
        address = request.data['address']
        city = request.data['city']
        phone = request.data['phone']
        state = request.data['state']
        
        # Then the new address should be made the current address
        new_address = Address(user = user, address=address, city= city, state = state, current = True)
        new_address.save()

        serializer = AddressSerializer(new_address)
        return Response(serializer.data)

    def update(self, request, *args, **kawargs):
        user_id = request.data['user']
        user = User.objects.get(id=user_id)
        user_addresses = Address.objects.filter(user=user)

        # When an address is created, find all that users' old addresses and make them non-current
        # This will ensure that we do not have more than 1 current address per user

        for i in user_addresses:
            i.current = False
            i.save()

        address_id = request.data['address']
        address = Address.objects.get(id=address_id)
        address.current = True
        address.save()

        serializer = AddressSerializer(address)
        return Response(serializer.data)
        

class UserAddressView(viewsets.ModelViewSet):
    serializer_class = UserAddressSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user')
        user_addresses = Address.objects.filter(user=user)
        serializer = UserAddressSerializer(user_addresses, many=True)
        return user_addresses

