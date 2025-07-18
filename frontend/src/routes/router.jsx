import { Suspense, lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router';
import { useLocation } from 'react-router';
import App from 'App';
import AuthLayout from 'layouts/auth-layout';
import DefaultAuthLayout from 'layouts/auth-layout/DefaultAuthLayout';
import MainLayout from 'layouts/main-layout';
import Page404 from 'pages/errors/Page404';
import ErrorBoundary from 'components/ErrorBoundary';
import AuthGuard from 'components/guard/AuthGuard';
import GuestGuard from 'components/guard/GuestGuard';
import PageLoader from 'components/loading/PageLoader';
import AllFiles from 'components/sections/file-manager/main/all-files';
import RecentFiles from 'components/sections/file-manager/main/recent-files';
import paths, { rootPaths } from './paths';

// import Splash from 'components/loading/Splash';

const LoggedOut = lazy(() => import('pages/authentication/default/LoggedOut'));
const ProjectManagement = lazy(() => import('pages/dashboards/ProjectManagement'));
const Account = lazy(() => import('pages/others/Account'));
const Notifications = lazy(() => import('pages/others/Notifications'));
const EventsDetail = lazy(() => import('pages/events/EventDetail'));
const CreateEvent = lazy(() => import('pages/events/CreateEvent'));
const Login = lazy(() => import('pages/authentication/default/jwt/Login'));
const SetPassword = lazy(() => import('pages/authentication/default/jwt/SetPassword'));

const Kanban = lazy(() => import('pages/apps/kanban'));
const KanbanBoards = lazy(() => import('pages/apps/kanban/Boards'));
const CreateBoard = lazy(() => import('pages/apps/kanban/CreateBoard'));

const EmailLayout = lazy(() => import('layouts/email-layout'));
const Email = lazy(() => import('pages/apps/email/Email'));
const EmailDetails = lazy(() => import('pages/apps/email/EmailDetails'));

const ChatLayout = lazy(() => import('components/sections/chat/ChatLayout'));
const Chat = lazy(() => import('pages/apps/chat'));
const NewChat = lazy(() => import('pages/apps/chat/NewChat'));
const Conversation = lazy(() => import('pages/apps/chat/Conversation'));

const Social = lazy(() => import('pages/apps/Social'));
const FileManager = lazy(() => import('pages/apps/FileManager'));
const Calendar = lazy(() => import('pages/apps/calendar/Calendar'));
const Scheduler = lazy(() => import('pages/apps/calendar/Scheduler'));
const CalendarLayout = lazy(() => import('components/sections/calendar/CalendarLayout'));

export const SuspenseOutlet = () => {
  const { pathname } = useLocation();

  const excludedPathPrefixes = [paths.chat, paths.fileManager, paths.email];

  const shouldUseKey = !excludedPathPrefixes.some((prefix) => pathname.startsWith(prefix));

  return (
    <Suspense key={shouldUseKey ? pathname : undefined} fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

export const routes = [
  {
    element: (
      // Uncomment the following line to enable the Suspense fallback for initial loading when using AuthGuard

      // <Suspense fallback={<Splash />}>
      <App />
      // </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <AuthGuard>
            <MainLayout>
              <SuspenseOutlet />
            </MainLayout>
          </AuthGuard>
        ),
        children: [
          // ... other routes
          {
            index: true,
            element: <ProjectManagement />,
          },
          {
            path: paths.project,
            element: <ProjectManagement />,
          },
          {
            path: paths.account,
            element: <Account />,
          },
          {
            path: rootPaths.eventsRoot,
            children: [
              {
                path: paths.events,
                element: <EventsDetail />,
              },
              {
                path: paths.createEvent,
                element: <CreateEvent />,
              },
              {
                path: '',
                element: <Page404 />,
              },
            ],
          },
          {
            path: paths.notifications,
            element: <Notifications />,
          },
          {
            path: rootPaths.kanbanRoot,
            element: (
              <Kanban>
                <Outlet />
              </Kanban>
            ),
            children: [
              {
                path: paths.boards,
                element: <KanbanBoards />,
              },
              {
                path: paths.createBoard,
                element: <CreateBoard />,
              },
            ],
          },
          {
            path: rootPaths.emailRoot,
            element: <EmailLayout />,
            children: [
              {
                index: true,
                element: <Navigate to={paths.emailLabel('inbox')} />,
              },
              {
                path: paths.emailLabel(':label'),
                element: <Email />,
              },
              {
                path: paths.emailDetails(':label', ':id'),
                element: <EmailDetails />,
              },
            ],
          },
          {
            path: paths.chat,
            element: <ChatLayout />,
            children: [
              {
                index: true,
                element: <Chat />,
              },
              {
                path: ':conversationId',
                element: <Conversation />,
              },
              {
                path: paths.newChat,
                element: <NewChat />,
              },
            ],
          },
          {
            path: paths.social,
            element: <Social />,
          },
          {
            path: paths.fileManager,
            element: <FileManager />,
            children: [
              {
                index: true,
                element: (
                  <>
                    <RecentFiles />
                    <AllFiles />
                  </>
                ),
              },
              { path: paths.fileManagerFolder(':id'), element: <AllFiles /> },
            ],
          },
          {
            path: paths.calendar,
            element: <CalendarLayout />,
            children: [
              {
                index: true,
                element: <Calendar />,
              },
            ],
          },
          {
            path: paths.scheduler,
            element: <CalendarLayout />,
            children: [
              {
                index: true,
                element: <Scheduler />,
              },
            ],
          },
        ],
      },
      {
        // Add an errorElement to the root route or specific routes
        // to catch errors during routing or rendering.
        // Replace ErrorBoundary with your custom error component.
        errorElement: <ErrorBoundary />,
      },
      {
        path: rootPaths.authRoot,
        element: (
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        ),
        children: [
          {
            element: (
              <DefaultAuthLayout>
                <SuspenseOutlet />
              </DefaultAuthLayout>
            ),
            children: [
              {
                path: rootPaths.authDefaultJwtRoot,
                children: [
                  {
                    path: paths.defaultJwtLogin,
                    element: <Login />,
                  },
                  {
                    path: paths.defaultJwtSetPassword,
                    element: <SetPassword />,
                  },
                ],
              },
              {
                path: paths.defaultLoggedOut,
                element: <LoggedOut />,
              },
            ],
          },
        ],
      },

      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASENAME || '/',
});

export default router;
