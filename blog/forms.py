from django import forms
from pagedown.widgets import AdminPagedownWidget
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout
from blog.models import Subscriber, Post

class SubscribeForm(forms.Form):
    subscribe_email = forms.EmailField( widget=forms.TextInput(attrs={
        "type":"email",
        "name":"email",
        "id":"email",
        "placeholder": "Type your email address...",
        "class": "rounded-0",
    }), label="")
    class Meta:
        model = Subscriber
class PostBodyForm(forms.ModelForm):
    body = forms.CharField(widget=AdminPagedownWidget)

    class Meta:
        model = Post
        fields = "__all__"