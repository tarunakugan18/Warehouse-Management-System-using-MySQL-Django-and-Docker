# Generated by Django 5.0.1 on 2024-01-26 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product_Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_sku', models.CharField(max_length=10)),
                ('tag_id', models.IntegerField()),
            ],
            options={
                'unique_together': {('product_sku', 'tag_id')},
            },
        ),
    ]
