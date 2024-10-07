/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GlobalStyles, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { CookiesProvider } from "react-cookie"

import { ROOT_ROUTE } from "./routes/Root"
import { darkTheme } from "./theme/style"
import { AUTHENTICATED_ROUTES } from "./routes/AuthenticatedRoutes"
import { STARTUP_ROUTE } from "./routes/startup/Startup"
import { appTheme } from "./theme/style"
import Notifier from "./features/Notifications/Notifier"
import { GameProvider } from "./routes/GameContext"

const router = createBrowserRouter([
	ROOT_ROUTE,
	AUTHENTICATED_ROUTES,
	STARTUP_ROUTE,
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<GameProvider>
			<CookiesProvider>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<CssBaseline enableColorScheme />
					<GlobalStyles
						styles={{
							body: {
								backgroundColor: appTheme.colors.background,
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
			</CookiesProvider>
		</GameProvider>
	</React.StrictMode>
)
