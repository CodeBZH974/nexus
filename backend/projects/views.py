from django.http import JsonResponse
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Project, ProjectPhase, Task
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ProjectSerializer, ProjectPhaseSerializer, TaskSerializer, UserSerializer

# Create your views here.

def api_root(request):
    """
    A simple root view for the API to confirm it's running.
    """
    return JsonResponse({'message': 'Welcome to the NexusFlow API!'})

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

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)