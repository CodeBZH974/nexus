from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from . import config  # Importe le fichier de configuration


class Project(models.Model):
    """Represents a project, which is a container for tasks."""
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owned_projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")
        ordering = ["-created_at"]


#    def get_absolute_url(self):
#        return reverse("projects:project_detail", kwargs={"pk": self.pk})

class ProjectPhase(models.Model):
    """Represents a phase within a project, grouping related tasks."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='phases')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0, help_text="Order of the phase within the project (for Kanban).")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.name} - {self.title}"


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    phase = models.ForeignKey(ProjectPhase, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=config.TASK_STATUS_CHOICES, default=config.TASK_STATUS_CHOICES[0][0])
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    estimated_duration = models.DurationField(null=True, blank=True, help_text="Estimated time to complete the task (e.g., '1 day', '3 hours')")
    due_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Task")
        verbose_name_plural = _("Tasks")
        ordering = ["due_date", "-created_at"]

# --- IA-Ready Models ---

class TaskStatusLog(models.Model):
    """
    Logs every status change for a task to build a historical dataset.
    This is crucial for training predictive models for completion times.
    """
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='status_logs')
    status_from = models.CharField(max_length=20, choices=config.TASK_STATUS_CHOICES, null=True, blank=True)
    status_to = models.CharField(max_length=20, choices=config.TASK_STATUS_CHOICES)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        

class TaskCompletionHistory(models.Model):
    """
    Captures detailed metrics upon task completion.
    This data will feed the resource allocation recommendation engine.
    """
    task = models.OneToOneField(Task, on_delete=models.CASCADE, related_name='completion_details')
    completed_at = models.DateTimeField(auto_now_add=True)
    actual_duration = models.DurationField(help_text="Actual time spent on the task.")
