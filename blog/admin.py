from django.contrib import admin
from blog.forms import PostBodyForm
from blog.models import Post, Category, Photo, Subscriber
from mptt.admin import DraggableMPTTAdmin
# Register your models here.
class CategoryAdmin(DraggableMPTTAdmin):
    pass
    
class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1   
class PostAdmin(admin.ModelAdmin):
    form = PostBodyForm
    list_display = ('title', 'author', 'timestamp', 'updated', 'category',)
    search_fields = ('title', 'body')
    inlines = [PhotoInline]
    class Media:
       pass
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'active', 'timestamp')
    ordering = ['-timestamp']
    
admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Subscriber, SubscriberAdmin)
