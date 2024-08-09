from django.urls import path
from . import views

urlpatterns = [
    #index page
    path("", views.index, name="index"),
    #view a recipie
    path("<int:recipe_id>/view/", views.view_recipe, name="view"),
    #create a recipie
    path("create/", views.create_recipe, name="create")
    
]