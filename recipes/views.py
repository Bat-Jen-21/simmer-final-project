from django.shortcuts import render, HttpResponse, redirect
from django.http import Http404, HttpRequest
from .models import Recipe, Recipe_Ingredient, Ingredient
from django.urls import reverse
import json
from django.utils import timezone
import ast

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
        "instructions": ast.literal_eval(recipe.instructions),
        "ingredients": ingredients,
        }
    return render(request, "recipes/view.html", context)

def create_display(request):
    measurements = Recipe_Ingredient.get_measurements()
    # Adding in the session data
    form_data = request.session.pop("form_data", None)
    print(form_data)
    blank = request.session.pop("blank", "0")
    context = {
        "measurements": measurements,
        "formDataJson": json.dumps(form_data),
        "formData": form_data,
        "blank": blank, 

    }
    return render(request, "recipes/create.html", context)

def create_submit(request):
    errors = []
    blank = "0"
    #Getting post form Data
    # print(request.POST)
    title = request.POST.get("title")
    description = request.POST.get("description")
    instructions = request.POST.getlist("list-element:instructions")
    ingredients = json.loads(request.POST.get("list-element:ingredients", default=[]))
    ingredient, quantity, measurement = "","",""
    if len(ingredients) > 1:
        ingredient = [ingredients[0]]
        print(ingredient)
        quantity = [ingredients[1]]
        measurement = [ingredients[2]]

    serves = request.POST.get("serves")
    # blank = request.POST.get("blank")
    #print(request.POST)
    #Input validation 
    #///////////////////////////////////////////////
    for key in request.POST:
        if request.POST[key].strip() == "":
            errors.append(key)
            blank = "1"
    if len(request.POST) != 6 or len(errors) > 0:
        print("REDIRECTING")
        # request.session["errors"] = errors
        request.session["form_data"] = {"title": title, "description": description, "instructions": instructions, "ingredients": ingredients, "serves": serves}
        request.session["blank"] = blank
        return redirect(reverse("create_display"))


    # Now we have access to the data do something with it
    else:
        #Creating a recipe in the database
        newRecipe = Recipe(title=title, description=description, instructions=instructions, creation_date=timezone.now())
        newRecipe.save()
        print(newRecipe)
        # Iterate through the ingredients and check the database
        for i in range(len(ingredient) - 1):
            newIngredient, created = Ingredient.objects.get_or_create(name=ingredient[i], 
                                                                      defaults={"name": ingredient[i]})
            newIngredient.save()
            newRecipeIngredient = Recipe_Ingredient(recipe=newRecipe, ingredient=newIngredient, 
                                                    quantity=quantity[i], measurement=measurement[i].capitalize())
            newRecipeIngredient.save()

    #Currently redirects to the main page for now
    return redirect(reverse("index"))