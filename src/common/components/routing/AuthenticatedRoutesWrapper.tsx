import { Navigate, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"

import {
	WELCOME_ROUTE_PATH,
	DASHBOARD_ROUTE_PATH,
} from "../../../routes/startup/startupPaths"
import { AuthenticatedUserWrapper } from "./AuthenticatedUserWrapper"
import AuthenticationModal from "../modals/AuthenticationModal"

export const AuthenticatedRoutesWrapper = () => {
	const [cookies] = useCookies(["userName"])
	const userName = cookies.userName
	const location = useLocation()

	if (!userName) {
		return <Navigate to={WELCOME_ROUTE_PATH} replace />
	}

	if (location.pathname === WELCOME_ROUTE_PATH) {
		return <Navigate to={DASHBOARD_ROUTE_PATH} replace />
	}

	return (
		<>
			<AuthenticationModal />
			<AuthenticatedUserWrapper userId={userName} />
		</>
	)
}
