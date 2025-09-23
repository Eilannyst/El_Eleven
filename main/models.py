from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=255) 
    price = models.IntegerField()
    description = models.TextField()
    thumbnail = models.URLField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False) 

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Products"