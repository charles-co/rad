from django import template
register = template.Library()

from blog.models import Category, Photo
from rad.forms import EmailPostForm
from blog.forms import SubscribeForm
from django.http import HttpResponseRedirect
from django.core.mail import send_mail
from django.contrib import messages
from django.http import HttpResponseRedirect

from blog.models import Post
import logging
logger = logging.getLogger(__name__)


@register.filter
def times(number):
    return range(number)


@register.inclusion_tag('tags/_category_list.html', takes_context=True)
def category_list(context):
    categories = Category.objects.filter(parent=None).order_by('position')
    request = context['request']
    return {'categories': categories, 'request': request}

@register.inclusion_tag('tags/_contact_us.html')
def contact_us():
    return {'form': EmailPostForm()}

@register.inclusion_tag('tags/_side_bar.html')
def side_bar():
    posts = Post.objects.published()[:5]
    return {'posts': posts}

@register.inclusion_tag('tags/_subscriber.html')
def subscribe():
    return {'form': SubscribeForm()}    

@register.inclusion_tag('tags/_carousel.html')
def carousel(id):
    post = Post.objects.get(id=id)
    return{'post': post}
