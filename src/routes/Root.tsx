import { Navigate, RouteObject, useLocation } from "react-router-dom"

import { DASHBOARD_ROUTE_PATH } from "./constants"

const Root = () => {
	const location = useLocation()

	// If redirecting from signin need to pass along the location state
	return <Navigate to={DASHBOARD_ROUTE_PATH} state={location.state} replace />
}

export const ROOT_ROUTE: RouteObject = {
	path: "/",
	element: <Root />,
	children: [],
}
