from django.urls import path
from .views import course_list, course_detail, course_list_published

urlpatterns = [
    path("api/courses", course_list, name="course_list"),
    path("api/courses/<int:pk>", course_detail, name="course_detail"),
    path("api/courses/published", course_list_published, name="course_list_published")
]
