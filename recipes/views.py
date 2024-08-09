from django.shortcuts import render, HttpResponse
from django.http import Http404
from .models import Recipe, Recipe_Ingredient, Ingredient

# Create your views here.
def index(request):
    recipes = Recipe.objects.all()
    context = {
        "recipes": recipes
    }
    return render(request, "recipes/index.html", context)

def view_recipe(request, recipe_id):

    # Missing recipe error handling
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        raise Http404("This recipe does not exist")
    
    # query the db for the ingredients
    # ingredients = Recipe_Ingredient.objects.filter(recipe=recipe)
    ingredients = recipe.recipe_ingredient_set.all()
    context = {
        "recipe": recipe,
        "ingredients": ingredients,
        }
    return render(request, "recipes/view.html", context)

def create_recipe(request):
    measurements = Recipe_Ingredient.get_measurements()
    context = {
        "measurements": measurements
    }
    return render(request, "recipes/create.html", context)