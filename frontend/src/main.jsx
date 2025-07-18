import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AuthProvider } from 'context/AuthContext';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import NotistackProvider from 'providers/NotistackProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import router from 'routes/router';
import SWRConfiguration from 'services/configuration/SWRConfiguration';
import './locales/i18n';

const AppProviders = ({ children }) => (
  <SWRConfiguration>
    <SettingsProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <NotistackProvider>
            <BreakpointsProvider>
              <CssBaseline enableColorScheme />
              <SettingsPanelProvider>
                <AuthProvider>{children}</AuthProvider>
              </SettingsPanelProvider>
            </BreakpointsProvider>
          </NotistackProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SettingsProvider>
  </SWRConfiguration>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>,
);
