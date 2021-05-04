from django.contrib import admin
from .models import Cart, Product, Category, User, Order, Image, Address

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(User)
admin.site.register(Image)
admin.site.register(Address)
