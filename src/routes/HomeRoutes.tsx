import { RouteObject } from "react-router-dom"

import { UserWorkspaceRoutesWrapper } from "../common/components/routing/UserWorkspaceRoutesWrapper"
import { DASH_ROUTES } from "./DashboardRoutes"

export const DASH_ROUTE_PATH = "/dashboard"

export const HOME_ROUTES: RouteObject = {
	element: <UserWorkspaceRoutesWrapper />,
	children: [DASH_ROUTES],
}
