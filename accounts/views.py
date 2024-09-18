from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView
from django.shortcuts import render,redirect
from .forms import CustomUserCreationForm
from  .models import CustomUser

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"

def accountDelete(request):
    account = CustomUser.objects.get(id=request.user.pk)
    if request.POST:
        account.delete()
        return redirect(reverse("index"))
    else:
        return render(request, "registration/account_delete.html", context={"user": request.user})