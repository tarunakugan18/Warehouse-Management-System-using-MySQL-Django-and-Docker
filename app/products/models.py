from django.db import models

# Create your models here.
class Product(models.Model):
    product_sku = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits = 8, decimal_places = 2)
    quantity = models.BigIntegerField()


