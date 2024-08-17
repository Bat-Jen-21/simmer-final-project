from django.shortcuts import render, HttpResponse, redirect
from django.http import Http404, HttpRequest
from .models import Recipe, Recipe_Ingredient, Ingredient
from django.urls import reverse
from . import helpers

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

def create_display(request):
    measurements = Recipe_Ingredient.get_measurements()
    # Adding in the session data
    form_data = request.session.pop("form_data", None)
    errors = request.session.pop("errors", None)
    print(form_data)
    if form_data:
        print(helpers.decode(form_data["instructions"]))
    print(f"errors {errors}")
    errors = request.session.pop("errors", None)
    context = {
        "measurements": measurements,
        "form_data": form_data,
        "errors": errors

    }
    return render(request, "recipes/create.html", context)

def create_submit(request):
    errors = []
    #Getting post form Data
    title = request.POST.get("title")
    description = request.POST.get("description")
    instructions = [request.POST.get("instruction-submit-list")]
    ingredients = [request.POST.get("ingredient-submit-list")]
    serves = request.POST.get("serves")

    #Input validation 
    #///////////////////////////////////////////////
    for key in request.POST:
        if request.POST[key].strip() == "":
            errors.append(key)
    
    if len(errors) > 0:
        print("REDIRECTING")
        request.session["errors"] = errors
        request.session["form_data"] = {"title": title, "description": description, "instructions": instructions, "ingredients": ingredients, "serves": serves}
        return redirect(reverse("create_display"))


    # Now we have access to the data do something with it     

    #Currently redirects to the main page for now
    return redirect(reverse("index"))