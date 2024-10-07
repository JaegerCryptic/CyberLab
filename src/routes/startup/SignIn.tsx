import { RouteObject } from "react-router-dom"

import { SignIn } from "../../features/startup/SignIn"
import { WELCOME_ROUTE_PATH } from "./startupPaths"

export const SIGNIN_ROUTE: RouteObject = {
	path: WELCOME_ROUTE_PATH,
	element: <SignIn buttonBehaviour='HYPERLINK' />,
}
