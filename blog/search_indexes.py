from haystack import indexes
from blog.models import Post

class PostIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title')
    body = indexes.CharField(model_attr='body')
    publish = indexes.DateTimeField(model_attr='publish_date')
    url = indexes.CharField()
    def get_model(self):
        return Post
    def index_queryset(self, using=None):
        return self.get_model().objects.published()
    def prepare_url(self, obj):
        return (''.join(obj.get_absolute_url()))