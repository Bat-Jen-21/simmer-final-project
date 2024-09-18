from django.contrib import admin
from .models import Recipe, Ingredient, Recipe_Ingredient, User
# Register your models here.
admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Recipe_Ingredient)
#admin.site.register(User)