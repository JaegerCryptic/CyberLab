export const getRedirectPath = (userName: string | undefined, pathname: string) => {
  const WELCOME_ROUTE_PATH = "/welcome";
  const DASHBOARD_ROUTE_PATH = "/dashboard";

  if (!userName && pathname !== WELCOME_ROUTE_PATH) {
    return WELCOME_ROUTE_PATH;
  }
  if (userName && pathname === WELCOME_ROUTE_PATH) {
    return DASHBOARD_ROUTE_PATH;
  }
  return null;
};