/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import Fuse from 'fuse.js'
import { z } from 'zod'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ROOT_ROUTE } from './routes/Root'
import { lightTheme } from './theme/style'
import { AUTHENTICATED_ROUTES } from './routes/AuthenticatedRoutes'
import { STARTUP_ROUTE } from './routes/startup/Startup'
import Notifier from './features/Notifications/Notifier'

const router = createBrowserRouter([
  ROOT_ROUTE,
  AUTHENTICATED_ROUTES,
  STARTUP_ROUTE,
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

type SearchSummary = z.infer<typeof SearchSummary>

export const DatasourcesContext = createContext<Fuse<SearchSummary>>(
  new Fuse([])
)

const Search = (
  { children }: { children: React.ReactNode } = { children: null }
) => {
  const fuse = useGetDataSourceFuse()

  return (
    <DatasourcesContext.Provider value={fuse}>
      {children}
    </DatasourcesContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={lightTheme}>
        <Notifier />
        <QueryClientProvider client={queryClient}>
          <Search>
            <RouterProvider router={router} />
          </Search>
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
)
