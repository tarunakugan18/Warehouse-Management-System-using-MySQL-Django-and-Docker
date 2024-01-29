# Generated by Django 5.0.1 on 2024-01-26 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_tag'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='product_tag',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='product_tag',
            constraint=models.UniqueConstraint(models.F('product_sku'), models.F('tag_id'), name='product_sku_tag_id_unique'),
        ),
    ]