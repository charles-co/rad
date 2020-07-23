from django import forms

class EmailPostForm(forms.Form):
    name = forms.CharField(max_length=25, required=True,
        label='<i class="fas fa-user"></i> Name:'
    )
    email = forms.EmailField(required=True,
        label='<i class="fas fa-envelope-square"></i> E-mail:'
    )
    comments = forms.CharField(required=True, widget=forms.Textarea,
        label='<i class="fas fa-comment"></i> Comment:'

    )