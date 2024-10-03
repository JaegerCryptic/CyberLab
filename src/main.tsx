/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { darkTheme } from './theme/style'; // Make sure the path is correct
import Notifier from './features/Notifications/Notifier';

// Uncomment this import when testing PasswordChecker directly
import PasswordChecker from './features/passwordChecker/components/PasswordChecker';

// Toggle between PasswordChecker and main routes
const router = createBrowserRouter([
  // Comment out these routes when testing PasswordChecker directly
  // ROOT_ROUTE,
  // AUTHENTICATED_ROUTES,
  // STARTUP_ROUTE,

  // Uncomment the following route when testing PasswordChecker directly
  {
    path: '/',
    element: <PasswordChecker />,
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
        <Notifier />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
