from django.db import models
from django.urls import reverse


class Course(models.Model):
    title = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    published = models.BooleanField(default=False)
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("course_detail", args=[str(self.id)])
