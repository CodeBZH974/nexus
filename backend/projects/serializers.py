from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, ProjectPhase, Task


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model, showing basic info."""
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for the Task model."""
    assignee = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'


class ProjectPhaseSerializer(serializers.ModelSerializer):
    """Serializer for the ProjectPhase model, including its tasks."""
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectPhase
        fields = ['id', 'title', 'description', 'order', 'project', 'tasks']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model, including its phases."""
    owner = UserSerializer(read_only=True)
    # We can use the phase serializer to nest the phases within the project detail
    phases = ProjectPhaseSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'created_at', 'updated_at', 'phases']