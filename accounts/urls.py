from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("account_delete/", views.accountDelete, name="delete_account"),
]