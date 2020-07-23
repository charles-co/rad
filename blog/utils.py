import re
import datetime
from math import ceil
from django.utils.html import strip_tags

def count_words(html_string):
    #word_string = strip_tags(html_string)
    matching_words = re.findall(r'\w+', html_string)
    count = len(matching_words)
    return count

def get_read_time(html_string):
    count = count_words(html_string)
    read_time_min = ceil(count/200.0)
    return int(read_time_min)