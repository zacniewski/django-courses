import datetime

from django.test import TestCase
from django.urls import reverse

from .models import Course


class CourseTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.course = Course.objects.create(
            title="Testing in Python with unittest",
            description="Best book about testing with Python",
            published=True,
            added=datetime.datetime(2023, 5, 5, 11, 21, 37, 582857)
        )

    def test_course_naming(self):
        self.assertEqual(f"{self.course.title}", "Testing in Python with unittest")
        self.assertTrue(f"{self.course.published}")
        self.assertEqual(f"{self.course.description}", "Best book about testing with Python")
        self.assertIn("2023", f"{self.course.added}")

    def test_course_list_view(self):
        response = self.client.get(reverse("course_list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Python")

    def test_course_detail_view(self):
        response = self.client.get(self.course.get_absolute_url())
        no_response = self.client.get("/courses/1/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(no_response.status_code, 404)
        self.assertContains(response, "Python")
