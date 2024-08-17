from django import forms

class CreateForm(forms.Form):
    title = forms.CharField(max_length=100)
    description = forms.Text