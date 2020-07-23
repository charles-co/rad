from django.shortcuts import render, redirect
from django.contrib.sites.shortcuts import get_current_site
from django.contrib import messages
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.views import View
from blog.models import Category, Photo, Post, Subscriber
from rad.forms import EmailPostForm
from django.urls import reverse_lazy
from django.http import Http404
from django.views import generic
from django.contrib.sites.shortcuts import get_current_site
# from django.template.loader import render_to_string
from django.views.generic.base import TemplateView, TemplateResponseMixin, ContextMixin
from django.views.generic.edit import FormView, FormMixin
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from haystack.query import SearchQuerySet
from haystack.generic_views import SearchView
import json
import logging
logger = logging.getLogger(__name__)
# Create your views here.
from blog.tasks import contact_us, subscriber_verification
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.db.models import Count
from blog.utils import get_read_time

def mailto(request):
    form = EmailPostForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        contact_us.delay(cd['name'], cd['email'], cd['comments'])
        messages.success(request, "<strong>Hi {} !</strong> Your mail has been sent successfully, thank you.".format(cd['name']))
    else:
        messages.error(request, "<strong>Hi {} !</strong> Unfortunately your mail wasn't sent, try again.".format(cd['name']))


class CategoryPost(generic.ListView):
    model = Post
    paginate_by = 1
    template_name = 'blog/post_by_category.html'
    def get_queryset(self):
        qs = super().get_queryset()   
        category_slug = self.kwargs["cat"]
        parent = Category.objects.get(parent=None, slug=category_slug)
        try:
            sub_category_slug = self.kwargs["subcat"]
        except KeyError:
            sub_category_slug = None
        if sub_category_slug:
            sub_category = Category.objects.get(parent=parent, slug=sub_category_slug)
            return qs.filter(category=sub_category).published()
        else:
            return qs.filter(category__in=parent.get_descendants(include_self=True))

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
    
    def post(self, request, *args, **kwargs):
        mailto(request)
        return HttpResponseRedirect(request.path_info)


class PostDetail(generic.DetailView):
    model = Post
    template_name_suffix = '_detail'
    def get_queryset(self):
        qs = super().get_queryset()    
        post_slug = self.kwargs["slug"]
        logger.info(post_slug)
        return qs.filter(slug=post_slug)   

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(**kwargs)
        post_tags_ids = self.object.tags.values_list('id', flat=True)
        similar_posts = Post.objects.filter(tags__in=post_tags_ids).exclude(id=self.object.id).published()
        similar_posts = similar_posts.annotate(same_tags=Count('tags')).order_by('-same_tags','-publish_date')[:4]
        context["similiar_post"] = similar_posts
        return context

    def post(self, request, *args, **kwargs):
        mailto(request)
        return HttpResponseRedirect(request.path_info)
    

class Search(SearchView):
    template_name = 'blog/post_search.html'

    def get(self, request, **kwargs):
        import ast 
        query = request.GET.get('query', '')
        results = SearchQuerySet().models(Post).filter(content=query).load_all()
        search_results = [resultsx for resultsx in results]
        for x in range(len(search_results)):
            search_results[x].title = ast.literal_eval(search_results[x].title)[0]
            search_results[x].url = ast.literal_eval(search_results[x].url)[0]
        total = results.count()
        return render(request, self.template_name, {'results':search_results, 'total':total, 'query':query})
    def post(self, request, *args, **kwargs):
        mailto(request)
        return HttpResponseRedirect(request.path_info)

def SubscriberCreate(request):
    if request.method == 'POST':
        email = request.POST['email']
        data = {}
        data = {
            'is_taken': Subscriber.objects.filter(email=email, active=True).exists(),
            'not_verified': Subscriber.objects.filter(email=email, active=False).exists()
        }
        if data['is_taken'] or data['not_verified']:
            return JsonResponse(data)
        else:
            subscriber = Subscriber.objects.create(email=email)
            current_site = "http://192.168.43.195:8000"
            subscriber_verification.delay(subscriber.id, current_site, email)
    return JsonResponse(data)

from blog.tokens import default_token_generator
def activate(request, uid64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uid64))
        subscriber = Subscriber.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Subscriber.DoesNotExist):
        subscriber = None
    if subscriber and default_token_generator.check_token(subscriber, token):
        subscriber.active = True
        subscriber.save()
        return HttpResponse('Thank you for your email confirmation.')
    else:
        return HttpResponse('Activation link invalid')