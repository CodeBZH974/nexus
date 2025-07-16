from django.contrib import admin
from .models import (
    Project,
    ProjectPhase,
    Task,
    TaskStatusLog,
    TaskCompletionHistory,
)


class ProjectPhaseInline(admin.TabularInline):
    model = ProjectPhase
    extra = 1  # Affiche 1 formulaire vide par défaut pour ajouter une nouvelle phase
    ordering = ('order',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectPhaseInline]
    list_display = ('name', 'owner', 'created_at', 'updated_at')
    search_fields = ('name', 'description', 'owner__username')
    list_filter = ('created_at', 'owner')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'owner')
        }),
        ('Details', {
            'fields': ('description',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )


@admin.register(ProjectPhase)
class ProjectPhaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'order')
    list_filter = ('project',)
    search_fields = ('title',)
    list_editable = ('order',)
    ordering = ('project', 'order')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'phase', 'status', 'assignee', 'due_date')
    list_filter = ('status', 'project', 'phase', 'assignee', 'due_date')
    search_fields = ('title', 'description', 'assignee__username', 'project__name')
    autocomplete_fields = ['assignee', 'project', 'phase']


@admin.register(TaskStatusLog)
class TaskStatusLogAdmin(admin.ModelAdmin):
    list_display = ('task', 'status_from', 'status_to', 'changed_by', 'timestamp')
    list_filter = ('changed_by', 'timestamp')
    readonly_fields = ('task', 'status_from', 'status_to', 'changed_by', 'timestamp')


@admin.register(TaskCompletionHistory)
class TaskCompletionHistoryAdmin(admin.ModelAdmin):
    list_display = ('task', 'completed_at', 'actual_duration')
    readonly_fields = ('task', 'completed_at', 'actual_duration')
