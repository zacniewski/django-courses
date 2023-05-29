from django.http.response import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from .models import Course
from .serializers import CourseSerializer


# GET list of courses, POST a new course, DELETE all courses
@api_view(['GET', 'POST', 'DELETE'])
def course_list(request):
    if request.method == 'GET':
        courses = Course.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            courses = courses.filter(title__icontains=title)

        courses_serializer = CourseSerializer(courses, many=True)
        # 'safe=False' is for objects serialization
        return JsonResponse(courses_serializer.data, safe=False)

    elif request.method == 'POST':
        course_data = JSONParser().parse(request)
        course_serializer = CourseSerializer(data=course_data)
        if course_serializer.is_valid():
            course_serializer.save()
            return JsonResponse(course_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Course.objects.all().delete()
        return JsonResponse(
            {'message': '{} Courses were deleted successfully!'.format(count[0])},
            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def course_detail(request, pk):
    # find course by pk (id)
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return JsonResponse({'message': 'The course does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        course_serializer = CourseSerializer(course)
        return JsonResponse(course_serializer.data)

    elif request.method == 'PUT':
        course_data = JSONParser().parse(request)
        course_serializer = CourseSerializer(course, data=course_data)
        if course_serializer.is_valid():
            course_serializer.save()
            return JsonResponse(course_serializer.data)
        return JsonResponse(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        course.delete()
        return JsonResponse({'message': 'Course was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


# GET all published courses
@api_view(['GET'])
def course_list_published(request):
    courses = Course.objects.filter(published=True)

    if request.method == 'GET':
        courses_serializer = CourseSerializer(courses, many=True)
        return JsonResponse(courses_serializer.data, safe=False)
