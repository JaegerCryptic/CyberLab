import { RouteObject } from "react-router-dom"

import { DASHBOARD_ROUTE_PATH } from "./constants"
import { UserWorkspaceRoutesWrapper } from "../common/components/routing/UserWorkspaceRoutesWrapper"

export const DASHBOARD_ROUTES: RouteObject = {
	path: DASHBOARD_ROUTE_PATH,
	element: <UserWorkspaceRoutesWrapper />,
	children: [
		{
			index: true,
			element: <div>Dashboard</div>, //TODO replace with actual dashboard
		},
	],
}
