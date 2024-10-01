import { RouteObject } from "react-router-dom"

export const WORKSPACES_ROUTES: RouteObject = {
	path: WORSPACES_ROUTE_PATH,
	children: [
		{
			index: true,
			element: <WorkspacesDashboard />,
		},
	],
}

export const WORKSPACE_ROUTES: RouteObject = {
	path: WORKSPACE_ROUTE_PATH,
	element: <WorkspaceRouteWrapper />,
	children: [
		{
			index: true,
			element: <Workspace />,
		},
		{
			path: WORKSPACE_ROUTE_PATHS.settings,
			element: <WorkspaceSettings />,
		},
		{ path: WORKSPACE_ROUTE_PATHS["bulk-edit"], element: <BulkEditScreen /> },
		{
			path: WORKSPACE_ROUTE_PATHS.tools,
			element: <WorkspaceTools />,
		},
		CLIENT_ROUTES,
		RESOURCE_ROUTES,
	],
}
