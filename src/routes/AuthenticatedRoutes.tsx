import {
	RouteObject,
	useLocation,
	useNavigate,
	useRouteError,
} from "react-router-dom"
import { ReactNode, useEffect } from "react"

import { AuthenticatedRoutesWrapper } from "../common/components/routing/AuthenticatedRoutesWrapper"
import { putError } from "../api/secure_core/errors/errors.put"
import { HOME_ROUTES } from "./HomeRoutes"

// The ErrorBoundary element is a wrapper for all routes that require a jwt.
// It catches the error stack and sends it to the server to be converted
const ErrorBoundary = (): ReactNode => {
	const url = useLocation().pathname
	const error = useRouteError() as unknown as Error
	const navigate = useNavigate()
	const minifiedFileName = error.stack?.match(/\/[^/]+\.js/g)?.[0].substring(1)

	const props = {
		url,
		stack: error.stack,
		userAgent: navigator.userAgent,
		message: error.message,
		minifiedFileName,
	}

	useEffect(() => {
		// Catch error, don't care if it fails.
		if (error) putError(props).catch((e) => console.error(e))
	})

	return (
		<>
			<div>⚠️ Placholder error page. Error occured, this has been logged.</div>
			<button
				onClick={() => {
					navigate("/")
				}}
			>
				Take me home
			</button>
		</>
	)
}

// The AuthenticatedRoutes element is a wrapper for all routes that require a jwt.
export const AUTHENTICATED_ROUTES: RouteObject = {
	element: <AuthenticatedRoutesWrapper />,
	children: [HOME_ROUTES],
	errorElement: <ErrorBoundary />,
}
