from django.shortcuts import render, HttpResponse, redirect
from django.http import Http404, HttpRequest, JsonResponse
from .models import Recipe, Recipe_Ingredient, Ingredient
from django.urls import reverse
import json
from django.utils import timezone
import ast
from decimal import Decimal
import imghdr
from django.contrib.auth.models import User
from random import shuffle, choice
from django.template.loader import render_to_string
from django.db.models import Q


# Create your views here.
def index(request):
    if request.user.is_authenticated:
        recipes = Recipe.objects.filter(author=request.user).order_by("?")

        context = {
            "recipes": recipes
        }
    else:
        context={}
    return render(request, "recipes/index.html", context)

def view_recipe(request, recipe_id):

    if recipe_id == 0:
        recipe_id = choice(Recipe.objects.all().order_by("?")).id

    # Missing recipe error handling
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        raise Http404("This recipe does not exist")
    
    # query the db for the ingredients
    # Join in the ingredients table using the django ORM chain query to get the names of the ingredients
    # Modify the result to remove trailing zeros
    recipe_ingredients = Recipe_Ingredient.objects.filter(recipe=recipe).select_related("ingredient")
    print(recipe_ingredients)
    def remove_trailing_zeros(n):
        return str(float(n)).rstrip("0").rstrip(".")
    
    for ri in recipe_ingredients:
        ri.quantity = remove_trailing_zeros(ri.quantity)

    for ri in recipe_ingredients:
        print(ri.ingredient.name)

    context = {
        "recipe": recipe,
        "instructions": ast.literal_eval(recipe.instructions),
        # "ingredients": ingredients,
        "recipeIngredients": recipe_ingredients,
        }
    return render(request, "recipes/view.html", context)

def create_display(request):
    measurements = Recipe_Ingredient.get_measurements()
    # Adding in the session data
    form_data = request.session.pop("form_data", None)
    blank = request.session.pop("blank", "0")
    jpeg = request.session.pop("jpeg", "0")
    context = {
        "measurements": measurements,
        "formDataJson": json.dumps(form_data),
        "formData": form_data,
        "blank": blank, 
        "jpeg": jpeg

    }
    return render(request, "recipes/create.html", context)

def create_submit(request):
    errors = []
    blank = "0"
    jpeg = "0"

    #Getting post form Data
    # print(request.POST)
    title = request.POST.get("title")
    description = request.POST.get("description")
    instructions = request.POST.getlist("list-element:instructions")
    ingredients = request.POST.getlist("list-element:ingredients", default=[])
    image = request.FILES.get("upload", None)
    timeH = int(request.POST.get("timeH"))
    timeM = int(request.POST.get("timeM"))

    print(f"{request.user.id} id")
    for i in range(len(ingredients)):
        ingredients[i] = json.loads(ingredients[i])
        
    serves = request.POST.get("serves")
    # blank = request.POST.get("blank")
    #Input validation 
    if image:
        if imghdr.what(image, h=None) != "jpeg":
            jpeg = "1"
    
    if timeH > 100 or timeM > 59:
        errors.append("x")
        
    for key in request.POST:
        if request.POST[key].strip() == "" and key != "upload":
            print("error ==" + key)
            errors.append(key)
            blank = "1"

    
    if len(errors) > 0 or jpeg == "1" or blank == "1":
        print("REDIRECTING")
        # request.session["errors"] = errors
        request.session["form_data"] = {"title": title, "description": description, "instructions": instructions, "ingredients": ingredients, "serves": serves, "timeH":timeH, "timeM": timeM}
        request.session["blank"] = blank
        request.session["jpeg"] = jpeg
        return redirect(reverse("create_display"))


    # Now we have access to the data do something with it
    else:
        #Creating a recipe in the database
        newRecipe = Recipe(title=title, description=description, instructions=instructions, creation_date=timezone.now(), serves=serves, timeH=timeH, timeM=timeM, author=request.user)
        if image:
            newRecipe.image = image
        newRecipe.save()
        # Iterate through the ingredients and check the database
        for i in range(len(ingredients)):
            newIngredient, c = Ingredient.objects.get_or_create(name=ingredients[i][0], 
                                                                      defaults={"name": ingredients[i][0]})


            newRecipeIngredient = Recipe_Ingredient(recipe=newRecipe, ingredient=newIngredient, 
                                                    quantity=ingredients[i][1], measurement=ingredients[i][2].capitalize())
            newRecipeIngredient.save()

    #Currently redirects to the main page for now
    return redirect(reverse("index"))

def iSearch(request):
    url_parameter = request.GET.get("q")

    if url_parameter:
        recipes = Recipe.objects.filter(Q(title__startswith=url_parameter) | Q(recipe_ingredient__ingredient__name__startswith=url_parameter))
    else:
        recipes = Recipe.objects.all()
    
    is_ajax_request = request.headers.get("x-requested-with") == "XMLHttpRequest"

    if is_ajax_request:
        html = render_to_string(
            template_name="recipes/results.html",
            context={"recipes": recipes}
        )

        data_dict = {"html_from_view": html}

        return JsonResponse(data=data_dict, safe=False)
    
    return render(request, "recipes/iSearch.html", context={"recipes": recipes})

def account(request):
    print(request.user)
    return render(request, "recipes/account.html", context={"account": request.user})