import docSitemap from 'docs/routes/docSitemap';
import paths, { rootPaths } from './paths';

const sitemap = [
  {
    id: 'homepage',
    subheader: 'Homepage',
    items: [
      {
        name: 'Dashboard',
        path: rootPaths.root,
        pathName: 'dashboard',
        icon: 'material-symbols:space-dashboard-outline-rounded',
        active: true,
      },
      {
        name: 'Email',
        path: paths.email,
        icon: 'material-symbols:mail-outline-rounded',
      },
      {
        name: 'Kanban',
        path: paths.kanban,
        icon: 'material-symbols:view-kanban-outline-rounded',
      },
      {
        name: 'Calendar',
        path: paths.calendar,
        icon: 'material-symbols:calendar-month-rounded',
      },
    ],
  },
  {
    id: 'pages',
    subheader: 'Pages',
    key: 'pages',
    items: [
      {
        name: 'Notifications',
        key: 'notifications',
        path: paths.notifications,
        pathName: 'notifications',
        icon: 'material-symbols:notifications-outline-rounded',
        active: true,
      },
      {
        name: 'Events',
        key: 'events',
        pathName: 'events',
        icon: 'material-symbols:calendar-clock-outline-rounded',
        active: true,
        items: [
          {
            name: 'Create event',
            key: 'create_event',
            path: paths.createEvent,
            pathName: 'create-event',
            active: true,
          },
          {
            name: 'Event detail',
            key: 'event_detail',
            path: paths.events,
            pathName: 'event-detail',
            active: true,
          },
        ],
      },
      {
        name: 'Authentication',
        key: 'authentication',
        pathName: 'authentication',
        icon: 'material-symbols:security-rounded',
        active: true,
        items: [
          {
            name: 'Login',
            key: 'login',
            path: paths.defaultJwtLogin,
            pathName: 'login',
            active: true,
          },
          {
            name: 'Sign up',
            key: 'sign_up',
            path: paths.defaultJwtSignup,
            pathName: 'sign-up',
            active: true,
          },
          {
            name: 'Set password',
            key: 'set_password',
            path: paths.defaultJwtSetPassword,
            pathName: 'default-set-password',
            active: true,
          },
        ],
      },
      {
        name: 'Error 404',
        key: 'error_404',
        pathName: 'error',
        active: true,
        icon: 'material-symbols:warning-outline-rounded',
        path: paths[404],
      },
    ],
  },
  {
    id: 'misc',
    subheader: 'Misc',
    key: 'misc',
    items: [
      {
        name: 'Account',
        key: 'account',
        path: paths.account,
        pathName: 'account',
        active: true,
        icon: 'material-symbols:admin-panel-settings-outline-rounded',
      },
    ],
  },
  ...docSitemap,
];

export default sitemap;
