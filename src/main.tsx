/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

// Import PasswordGame for testing
import PasswordGame from './features/passwordGame/components/PasswordGame';

// Comment out these routes for now
// import { ROOT_ROUTE } from './routes/Root';
import { darkTheme } from './theme/style';
// import { AUTHENTICATED_ROUTES } from './routes/AuthenticatedRoutes';
// import { STARTUP_ROUTE } from './routes/startup/Startup';
// import Notifier from './features/Notifications/Notifier';

// Route for PasswordGame
const router = createBrowserRouter([
  {
    path: '/',
    element: <PasswordGame />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline enableColorScheme />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#121C21',
          },
        }}
      />
      <ThemeProvider theme={darkTheme}>
        {/* Notifier is commented out for testing purposes */}
        {/* <Notifier /> */}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
