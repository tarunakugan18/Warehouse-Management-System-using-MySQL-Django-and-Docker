# Generated by Django 5.0.1 on 2024-01-27 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inbounds", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="inbound",
            name="id",
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="supplier",
            name="supplier_id",
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
