# Generated by Django 5.0.1 on 2024-01-27 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("outbounds", "0002_outbound"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="customer_id",
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="outbound",
            name="id",
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]