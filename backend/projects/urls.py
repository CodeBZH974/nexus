from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectPhaseViewSet, TaskViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'phases', ProjectPhaseViewSet, basename='projectphase')
router.register(r'tasks', TaskViewSet, basename='task')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]