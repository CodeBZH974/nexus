from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Project, ProjectPhase, Task
from .serializers import ProjectSerializer, ProjectPhaseSerializer, TaskSerializer, UserSerializer

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    """API endpoint that allows projects to be viewed or edited."""
    queryset = Project.objects.all().prefetch_related('phases__tasks')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProjectPhaseViewSet(viewsets.ModelViewSet):
    """API endpoint that allows project phases to be viewed or edited."""
    queryset = ProjectPhase.objects.all()
    serializer_class = ProjectPhaseSerializer
    permission_classes = [permissions.IsAuthenticated]

class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint that allows tasks to be viewed or edited."""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    """
    Retrieve the currently authenticated user.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)