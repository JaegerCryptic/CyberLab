import { RouteObject } from 'react-router-dom'

import { SignIn } from '../../features/startup/SignIn'
import { WELCOME_PATH } from './startupPaths'

export const SIGNIN_ROUTE: RouteObject = {
  path: WELCOME_PATH,
  element: <SignIn buttonBehaviour="HYPERLINK" />,
}
