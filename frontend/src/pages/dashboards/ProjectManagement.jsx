import Grid from '@mui/material/Grid';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import Events from 'src/components/sections/dashboards/project/events/Events';
import HoursCompleted from 'src/components/sections/dashboards/project/hours-completed/HoursCompleted';
import ProductRoadmap from 'src/components/sections/dashboards/project/product-roadmap/ProductRoadmap';
import ProjectDeadlines from 'src/components/sections/dashboards/project/project-deadlines/ProjectDeadlines';
import ProjectTimeline from 'src/components/sections/dashboards/project/project-timeline/ProjectTimeline';
import ScheduleMeeting from 'src/components/sections/dashboards/project/schedule-meeting/ScheduleMeeting';
import TaskSummary from 'src/components/sections/dashboards/project/task-summary/TaskSummary';
import {
  projectHours,
  projectTimelineData,
  taskMetrics,
  upcomingMeetings,
} from 'src/data/project/dashboard';
import { useProjects } from 'src/services/swr/api-hooks/useProjectApi';

const ProjectManagement = () => {
  const { projects, isLoading, error } = useProjects();
  const { up } = useBreakpoints();
  const upXl = up('xl');

  return (
    <Grid container>
      <Grid container size={12}>
        {!upXl && (
          <Grid size={12}>
            <TaskSummary taskMetrics={taskMetrics} />
          </Grid>
        )}

        <Grid container size={{ xs: 12, lg: 7, xl: 9 }}>
          {upXl && (
            <Grid size={12}>
              <TaskSummary taskMetrics={taskMetrics} />
            </Grid>
          )}
          <Grid size={12}>
            <ProjectTimeline projectTimelineData={projectTimelineData} />
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 5, xl: 3 }}>
          <ProjectDeadlines deadlineMetrics={[]} />
        </Grid>

        <Grid size={{ xs: 12, lg: 7, xl: 9 }} order={{ sm: 1, lg: 0 }}>
          {isLoading && <p>Loading projects...</p>}
          {error && <p>Error loading projects: {error.data?.detail || 'Please try again.'}</p>}
          {projects && <ProductRoadmap projectInfos={projects} />}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 5, xl: 3 }} order={{ sm: 0, lg: 1 }}>
          <ScheduleMeeting upcomingMeetings={upcomingMeetings} />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, xl: 7 }}>
        <Events events={[]} />
      </Grid>

      <Grid size={{ xs: 12, xl: 5 }}>
        <HoursCompleted projectHours={projectHours} />
      </Grid>
    </Grid>
  );
};

export default ProjectManagement;
