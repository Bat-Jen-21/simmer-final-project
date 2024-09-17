from django.db import models
from django.contrib.auth.models import AbstractUser

# Add an addition one to one field to extend the user table to allow email verification and password reset
class CustomUser(AbstractUser):
    username = models.CharField(unique=True, max_length=254)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username