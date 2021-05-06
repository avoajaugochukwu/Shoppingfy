from rest_framework import serializers
from .models import Category, Product, Cart, Order, Image, User, Address

from dj_rest_auth.models import TokenModel


# These serializers, User & Token Serializers override the default serializers 
# provided by dj-rest-auth. Because dj-rest-auth only returns "key" after login or registration.
# THese serializers, will provide other details about the user like username and email
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'company_name')


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = TokenModel
        fields = ('key', 'user')


# End of Auth Section

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category


class ImageSerializer(serializers.ModelSerializer):
    # image = VersatileImageFieldSerializer(sizes=[('full_size', 'url'), ('thumbnail', 'thumbnail__100x100'), ('product_image', 'thumbnail__350x350')])


    class Meta:
        model = Image
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Cart


# class CustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         fields = '__all__'
#         model = Customer


# class SellerSerializer(serializers.ModelSerializer):
#     class Meta:
#         fields = '__all__'
#         model = Seller


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Order


class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    seller = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        fields = '__all__'
        look_up_field = 'slug'
        extra_kwargs = { 'url': {'lookup_field': 'slug'} }
        model = Product


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Address


class UserAddressSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        fields = '__all__'
        model = Address
        

