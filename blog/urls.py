from django.conf.urls import url 
from django.urls import path, re_path
from django.views.i18n import JavaScriptCatalog
from .views import PostDetail, CategoryPost, Search, SubscriberCreate, activate
from blog.feeds import LatestPostsFeed
app_name = 'blog'
urlpatterns = [
    re_path(r'^(?:(?P<cat>[-\w]+)/)?(?:(?P<subcat>[-\w]+)/)?_(?P<slug>[-\w]+)/$', PostDetail.as_view(), name='post_detail'),
    re_path(r'^(?:(?P<cat>[-\w]+)/)?(?:(?P<subcat>[-\w]+)/)?$', CategoryPost.as_view(), name='post_by_category'),
    path('subscriber/create/', SubscriberCreate),
    path('activate/<str:uid64>/<str:token>/', activate, name='activate'),
    path('jsi18n', JavaScriptCatalog.as_view(), name='javascript-catalog'),
]