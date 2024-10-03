import { RouteObject } from "react-router-dom"

// TODO
import { WelcomeDashboard } from "../../features/startup/WelcomeDashboard"
import { WELCOME_PATH } from "./startupPaths"

export const WELCOME_ROUTE: RouteObject = {
	path: WELCOME_PATH,
	element: <WelcomeDashboard />,
}
