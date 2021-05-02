import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
# from versatileimagefield.fields import VersatileImageField, PPOIField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from django.urls import reverse


# Create your models here.
class User(AbstractUser):
    is_customer = models.BooleanField(default=False)
    is_seller = models.BooleanField(default=False)
    company_name = models.CharField(blank=True, max_length=50)


# class Customer(models.Model):
#     user = models.OneToOneField(to=User, on_delete=models.CASCADE, primary_key=True)

#     def __str__(self):
#         return self.user.username

# # In future add signal for sellers side too
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Customer.objects.create(user=instance)
# # In future add signal for sellers side too
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.customer.save()


# class Seller(models.Model):
#     user = models.OneToOneField(to=User, on_delete=models.CASCADE, primary_key=True)
#     company_name = models.CharField(blank=False, max_length=500)
#     phone = models.CharField(blank=False, max_length=11)

#     def __str__(self):
#         return self.user.username


class Category(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Image(models.Model):
    name = models.CharField(max_length=255)
    # image = VersatileImageField('image', upload_to='product/images/', ppoi_field='image_ppoi')
    # image_ppoi = PPOIField()
    image = models.ImageField(upload_to='product/images/')

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, blank=False, unique=True)
    description = models.TextField(max_length=4000, blank=False)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(default=0.0, max_digits=19, decimal_places=10)
    images = models.ManyToManyField(to=Image, related_name='product_images')
    is_discontinued = models.BooleanField(default=False)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name='product_category')
    seller = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='product_seller')
    slug = models.SlugField(max_length = 250, null = False, blank = False, unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product_detail', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Address(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='customer_address')
    phone = models.CharField(blank=False, max_length=11)
    address = models.TextField(blank=False)
    city = models.CharField(blank=False, max_length=30)
    state = models.CharField(blank=False, max_length=30)
    current = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.user} | {self.current} | {self.address}'


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_number = models.CharField(max_length=10)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='order_customer')
    date = models.DateTimeField(auto_now=True)
    amount = models.DecimalField(default=0.0, max_digits=19, decimal_places=10)

    def __str__(self):
        return self.order_number


class Cart(models.Model):
    order = models.ForeignKey(to=Order, on_delete=models.CASCADE, related_name='cart_order')
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE, related_name='cart_product')
    price = models.DecimalField(default=0.0, max_digits=19, decimal_places=10)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['order', 'product']