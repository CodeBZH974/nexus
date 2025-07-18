import Grid from '@mui/material/Grid';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import Events from 'src/components/sections/dashboards/project/events/Events';
import HoursCompleted from 'src/components/sections/dashboards/project/hours-completed/HoursCompleted';
import ProductRoadmap from 'src/components/sections/dashboards/project/product-roadmap/ProductRoadmap';
import ProjectDeadlines from 'src/components/sections/dashboards/project/project-deadlines/ProjectDeadlines';
import ProjectTimeline from 'src/components/sections/dashboards/project/project-timeline/ProjectTimeline';
import TaskSummary from 'src/components/sections/dashboards/project/task-summary/TaskSummary';
// Les données statiques sont supprimées, elles seront remplacées par des hooks SWR.
// import { projectHours, projectTimelineData, taskMetrics } from 'src/data/project/dashboard';
import { useProjects } from 'src/services/swr/api-hooks/useProjectApi';
// Importez ici les futurs hooks pour les autres données du dashboard
// import { useTaskSummary, useProjectTimeline, useProjectHours, useEvents, useDeadlines } from 'src/services/swr/api-hooks/useDashboardApi';

const ProjectManagement = () => {
  const { projects, isLoading, error } = useProjects();
  const { up } = useBreakpoints();
  const upXl = up('xl');
  // Exemple d'utilisation des futurs hooks
  // const { taskMetrics, isLoading: isLoadingTasks } = useTaskSummary();
  // const { projectTimelineData, isLoading: isLoadingTimeline } = useProjectTimeline();

  // J'ai enlevé le Fragment (<>) et la balise </Grid> finale en trop.
  // Maintenant, toutes les Grid sont enfants de la Grid principale "container".
  return (
    <Grid container>
      {/* --- PREMIÈRE LIGNE --- */}
      <Grid container size={12}>
        {!upXl && (
          <Grid size={12}>
            {/* Remplacer par les données du hook */}
            <TaskSummary taskMetrics={[]} />
          </Grid>
        )}
      </Grid>

      {/* --- DEUXIÈME LIGNE --- */}
      <Grid container size={{ xs: 12, lg: 7, xl: 9 }}>
        {upXl && (
          <Grid size={12}>
            {/* Remplacer par les données du hook */}
            <TaskSummary taskMetrics={[]} />
          </Grid>
        )}
        {isLoading && <p>Loading projects...</p>}
        {error && <p>Error loading projects: {error.data?.detail || 'Please try again.'}</p>}
        {projects && <ProductRoadmap projectInfos={projects} />}
        <Grid size={12}>
          {/* Remplacer par les données du hook */}
          <ProjectTimeline projectTimelineData={[]} />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 5, xl: 3 }} order={{ sm: 0, lg: 1 }}>
        <ProjectDeadlines deadlineMetrics={[]} />
      </Grid>

      {/* --- TROISIÈME LIGNE --- */}
      <Grid size={{ xs: 12, xl: 7 }}>
        {/* Remplacer par les données du hook */}
        <Events events={[]} />
      </Grid>

      <Grid size={{ xs: 12, xl: 5 }}>
        {/* Remplacer par les données du hook */}
        <HoursCompleted projectHours={{}} />
      </Grid>
    </Grid> // La balise fermante du Grid container principal
  );
};

export default ProjectManagement;
