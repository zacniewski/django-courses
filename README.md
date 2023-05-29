

### Fixtures
- to create, use:  
     ```bash
    python manage.py dumpdata courses.Course --indent 4 > courses/fixtures/course.json
     ```
- if you have empty database you can load data from fixture file with:    
     ```bash
    python manage.py loaddata courses/fixtures/course.json --app courses.Course 
     ```