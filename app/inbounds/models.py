from django.db import models

# Create your models here.
class Supplier(models.Model):
    supplier_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)

# Create your models here.
class Inbound(models.Model):
    id = models.BigAutoField(primary_key=True)
    reference = models.CharField(max_length=15)
    date_received = models.DateTimeField()
    product_sku = models.CharField(max_length=10)
    quantity = models.BigIntegerField()
    location = models.CharField(max_length=150)
    remarks = models.CharField(max_length=250)
    supplier_id = models.ForeignKey(Supplier, on_delete=models.CASCADE)
