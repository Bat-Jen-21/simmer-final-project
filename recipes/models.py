from django.db import models
from django.conf import settings 
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()
# Recipe Model
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField()
    timeH = models.IntegerField(default=0)
    timeM = models.IntegerField(default=0)
    creation_date = models.DateTimeField(auto_now_add=True)
    serves = models.IntegerField(default=1)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    # Adding an image parameter
    image = models.ImageField(upload_to="images/", default="/images/cook_pot.jpg")

    def __str__(self):
        return(self.title)
    
class Ingredient(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return(self.name)

class Recipe_Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient= models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.DecimalField(decimal_places=2, max_digits=10)

    MEASUREMENT_CHOICES = [
        ("GRAMS", "g"),
        ("PIECES", "pieces"),
        ("ML", "ml"),
        ("CUPS", "cups"),
        ("AMOUNT", "amount"),
        ("TEASPOONS", "teaspoons"),
        ("TABLESPOONS", "tablespoons"),
        ("WHOLE", "whole"),
        ("CANS", "cans")
        ]

    measurement = models.CharField(
        max_length=20,
        choices=MEASUREMENT_CHOICES,
        default="GRAMS"
    )

    def __str__(self):
        return(f"{self.quantity} {self.measurement} of {self.ingredient.name} for {self.recipe.title}")

    @classmethod
    def get_measurements(cls):
        m = [m[1] for m in cls.MEASUREMENT_CHOICES]
        return m


# Make an authors table that can refence a users table

# Image table