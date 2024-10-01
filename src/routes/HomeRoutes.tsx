import { RouteObject } from "react-router-dom"

import { UserWorkspaceRoutesWrapper } from "../common/components/routing/UserWorkspaceRoutesWrapper"
import { DASHBOARD_ROUTES } from "./DashboardRoutes"

export const HOME_ROUTES: RouteObject = {
	element: <UserWorkspaceRoutesWrapper />,
	children: [DASHBOARD_ROUTES],
}
