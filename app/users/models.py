from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, password=None, user_type=None, **extra_fields):
        if not user_id:
            raise ValueError("The user must have a user_id")
        user = self.model(
            user_id=user_id,
            user_type=user_type,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    user_id = models.BigAutoField(primary_key=True, unique=True)
    password = models.CharField(max_length=250)
    user_type = models.CharField(max_length=20)
    name = models.CharField(max_length=250)

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_id'
    # REQUIRED_FIELDS = ['user_type']
