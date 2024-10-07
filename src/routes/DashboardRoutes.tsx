import { RouteObject } from "react-router-dom"

import { DASHBOARD_ROUTE_PATH } from "./constants"
import { UserWorkspaceRoutesWrapper } from "../common/components/routing/UserWorkspaceRoutesWrapper"
import { Dashboard } from "../features/dashboard/dashboard"

export const DASHBOARD_ROUTES: RouteObject = {
	path: DASHBOARD_ROUTE_PATH,
	element: <UserWorkspaceRoutesWrapper />,
	children: [
		{
			index: true,
			element: <Dashboard />,
		},
	],
}
