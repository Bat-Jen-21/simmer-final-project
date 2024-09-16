from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #index page
    path("", views.index, name="index"),
    #view a recipie
    path("<int:recipe_id>/view/", views.view_recipe, name="view"),
    #create a recipie
    path("create/", views.create_display, name="create_display"),
    #Submit a recipe
    path("submit/", views.create_submit, name="submit"),
    #Search for ingredients
    path("iSearch/", views.iSearch, name="i_search"),
    
]

