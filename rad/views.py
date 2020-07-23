from django.urls import reverse
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.views.generic import ListView, RedirectView
from django.views.generic.edit import FormView
from django.core.mail import send_mail
from blog.models import Post, Category
from rad.forms import EmailPostForm
from taggit.models import Tag
from blog.views import mailto
import logging
logger = logging.getLogger(__name__)
 
class BlogHomeView(RedirectView):
    pattern_name = 'index'
    
class HomeView(ListView):
    model = Post
    template_name = "index.html"
    paginate_by = 2

    def get_queryset(self):
        qs = super().get_queryset()
        try:
            tag_slug = self.kwargs["tag"]
        except (KeyError, NameError):
            return qs.published()
        else:
            tag = get_object_or_404(Tag, slug=tag_slug)
            self.tagname = tag.name
            return qs.filter(tags__in=[tag]).published()

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)

        try:
            context["title"] = 'Post tagged with "{}"'.format(self.tagname)
        except:
            context["title"] = None
        return context

    def post(self, request, *args, **kwargs):
        mailto(request)
        return HttpResponseRedirect(request.path_info)
    
# def send_mail(request):
#     sent = False
#     form = EmailPostForm()
#     if request.method == 'POST':
#         form = EmailPostForm(request.POST)
#         if form.is_valid():
#             cd = form.cleaned_data
#             subject = 'Feedback'
#             message = 'Read "{}" {} comments: {}'.format(post.title, cd['name'], cd['comments'])
#             send_mail(subject, message, 'ch4rles.co@gmail.com', ['charlesboy49@gmail.com'], fail_silently=False)
#             sent = True
#         return HttpResponseRedirect(request.path_info)

#     return render(request, "_contact_us.html", {'sent': sent, 'form': form})