"""rad URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import include, url
from django.urls import path
from rad.views import HomeView, BlogHomeView
from django.views.defaults import permission_denied, page_not_found, server_error
# from django_email_verification import urls as mail_urls
from django.contrib.sitemaps.views import sitemap
from blog.sitemaps import PostSitemap
from blog.feeds import LatestPostsFeed
from blog.views import Search



sitemaps = {
    'posts': PostSitemap,
}   


urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', HomeView.as_view(), name='index'),
    path('', BlogHomeView.as_view(), name='blog-index'),
    path('tag/<str:tag>/', HomeView.as_view(), name='post_by_tag'),
    url(r'^blog/feed/$', LatestPostsFeed(), name='post_feed'),
    path('blog/search/', Search.as_view(), name='search'),
    path('blog/', include('blog.urls', namespace="blog")),
    path('comments/', include('django_comments_xtd.urls')),
    path('', include('pagedown.urls')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    # path('email/', include(mail_urls)),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [
        path('__debug__', include(debug_toolbar.urls)),
    ]
