import { RouteObject } from 'react-router-dom'

import { SignIn } from '../../features/startup/SignIn'
import {  WORKSPACES_ROUTE_PATH } from './startupPaths'

export const SIGNIN_ROUTE: RouteObject = {
  path: WORKSPACES_ROUTE_PATH,
  element: <SignIn buttonBehaviour="HYPERLINK" />,
}
