import { RouteObject } from 'react-router-dom'

import { SIGNIN_ROUTE } from './SignIn'

export const STARTUP_ROUTE: RouteObject = {
  children: [SIGNIN_ROUTE],
}
