# Generated by Django 5.0.1 on 2024-01-26 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_user_options_alter_user_name_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['user_id', 'name', 'password', 'user_type']},
        ),
    ]
