import { Navigate, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"

import { AuthenticatedUserWrapper } from "./AuthenticatedUserWrapper"
import AuthenticationModal from "../modals/AuthenticationModal"
import { getRedirectPath } from "./helpers"

export const AuthenticatedRoutesWrapper = () => {
	const [cookies] = useCookies(["userName"])
	const userName = cookies.userName
	const location = useLocation()

	const redirectPath = getRedirectPath(userName, location.pathname)

	if (redirectPath) {
		return <Navigate to={redirectPath} replace />
	}

	return (
		<>
			<AuthenticationModal />
			<AuthenticatedUserWrapper userId={userName} />
		</>
	)
}
