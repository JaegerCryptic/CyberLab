import { Navigate } from 'react-router-dom'

import { getAccessTokenId } from '../../utils/tokens'
import { WORKSPACES_ROUTE_PATH } from '../../../routes/startup/startupPaths'
import { AuthenticatedUserWrapper } from './AuthenticatedUserWrapper'
import AuthenticationModal from '../modals/AuthenticationModal'

export const AuthenticatedRoutesWrapper = () => {
  const token = getAccessTokenId()

  // Can navigate to external
  if (!token) {
    return <Navigate to={WORKSPACES_ROUTE_PATH} replace />
  }

  return (
    <>
      <AuthenticationModal />
      <AuthenticatedUserWrapper userId={token} />
    </>
  )
}
