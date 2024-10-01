import { Navigate, RouteObject, useLocation } from 'react-router-dom'
// import  Dashboard from '../features/dashboard/dashboard.tsx'

export const WORKSPACES_ROUTE_PATH = '/workspaces'

const Root = () => {
  const location = useLocation()

  // If redirecting from signin need to pass along the location state
  return <Navigate to={WORKSPACES_ROUTE_PATH} state={location.state} replace />
}

export const ROOT_ROUTE: RouteObject = {
  path: '/',
  element: <Root />,
  children: [],
}

// // trying to define the dashboard as a proper route ... but im not sure this is the correct way to do it.
// export const DASHBOARD_ROUTE: RouteObject ={
//   path: '/dashboard',
//   element: <Dashboard />,
//   children: [],
// }