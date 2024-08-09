from django.db import models

# Create your models here.

# Recipe Model
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)

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
        ("GRAMS", "Grams"),
        ("PIECES", "Pieces"),
        ("CUPS", "Cups"),
        ("AMOUNT", "Amount")]

    measurement = models.CharField(
        max_length=10,
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