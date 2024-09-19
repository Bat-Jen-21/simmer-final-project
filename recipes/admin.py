from django.contrib import admin
from .models import Recipe, Ingredient, Recipe_Ingredient, User

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Recipe_Ingredient)
