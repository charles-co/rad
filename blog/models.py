from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.safestring import mark_safe
from markdown_deux import markdown
from django.template.defaultfilters import slugify
from django.conf import settings
from mptt.models import MPTTModel, TreeForeignKey
from taggit.managers import TaggableManager
from blog.utils import get_read_time
# from django.db.models.signals import  
import uuid


User = settings.AUTH_USER_MODEL
# Create your models here.
def images_directory_path(instance, filename):
    return '/'.join(['upload', str(instance.post.timestamp.date()), 
                        str(instance.post.id ) + " " + str(instance.post.title), 
                        str(uuid.uuid4().hex + ".png")])

class PostQuerySet(models.QuerySet):
    def published(self):
        now = timezone.now()
        return self.filter(draft=False, publish_date__lte=now)


class PostManager(models.Manager):
    def get_queryset(self):
        return PostQuerySet(self.model, using=self._db)

    def published(self):
        return self.get_queryset().published()

    def search(self, query=None):
        if query is None:
            return self.get_queryset().none()
        return self.get_queryset().published().search(query)

class Category(MPTTModel):
    name = models.CharField(max_length=25, db_index=True)
    slug = models.SlugField(max_length=50, db_index=True, editable=False, allow_unicode=True)
    parent = TreeForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='children', db_index=True)
    position = models.PositiveSmallIntegerField(unique=True, db_index=True)
    class MPTTMeta:
        order_insertion_by = ['position']

    class Meta:
        unique_together = ('slug', 'parent',)
        verbose_name_plural = ("Categories")
        ordering = ('name',)
        verbose_name = 'Category'

    def get_absolute_url(self):
        return reverse('blog:post_by_category',args=[self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_slug_list(self):
        try:
            ancestors = self.get_ancestors(include_self=True)
        except:
            ancestors = []
        else:
            ancestors = [ i.slug for i in ancestors ]
        slugs = []
        for i in range(len(ancestors)):
            slugs.append('/'.join(ancestors[:i+1]))
        return slugs
        
    def __str__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(User, default=1, on_delete=models.CASCADE, related_name='authorpost')
    category = TreeForeignKey(Category, related_name='postcategory', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField()
    read_time = models.PositiveSmallIntegerField(null=True, blank=True, editable=False,)
    draft = models.BooleanField(default=False)
    slug = models.SlugField(max_length=200, db_index=True, unique=True, editable=False, allow_unicode=True)
    publish_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = PostManager()
    tags = TaggableManager()

    class Meta:
        ordering = ['-publish_date', '-updated', '-timestamp']
        index_together = (('id', 'slug'),)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        self.read_time = get_read_time(self.body)
        super().save(*args, **kwargs)
    def get_markdown(self):
        return mark_safe(markdown(self.body))

    def get_absolute_url(self):
        return reverse('blog:post_detail', kwargs={"slug":self.slug,})

    def get_slug_list(self):
        k = self.category
        breadcrumb = []
        while k is not None:
            breadcrumb.append(k)
            k = k.parent
        return breadcrumb
        # for i in range(len(breadcrumb) - 1):
        #     breadcrumb[i] = '/'.join(breadcrumb[-1:i-1:-1])
        # return breadcrumb[-1:0:-1]

    def __str__(self):
        return "{} publsihed on {}".format(self.title, self.timestamp)


class Photo(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='photos')
    file = models.ImageField(upload_to=images_directory_path, unique=True, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.post.title

class Subscriber(models.Model):
    email = models.EmailField()
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    active = models.BooleanField(default=False, db_index=True)

    class Meta:
        # unique_together = ('slug', 'parent',)
        verbose_name_plural = ("Subscribers")
        ordering = ('timestamp',)
        verbose_name = 'Subscriber'

    def __str__(self):
        return self.email
    
