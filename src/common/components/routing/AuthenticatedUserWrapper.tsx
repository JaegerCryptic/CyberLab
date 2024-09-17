import { createContext, useCallback } from 'react'
import { useIdleTimer } from 'react-idle-timer'

import { useRefreshTokenStatus } from '../../utils/useRefreshTokenStatus'
import { useWebsocket } from '../../utils/useWebsocket'
import { setAccessToken } from '../../utils/tokens'

// This wrapper component is to initialize the app with the user context
export const UserContext = createContext('')

interface AuthenticatedUserWrapperProps {
  userId: string
  inactivityTimeout?: number // Optional prop for inactivity timeout in minutes
}

const getTimeoutMs = (timeout_minutes?: number) => {
  if (timeout_minutes === 0) return 0
  if (!timeout_minutes) return 0

  return timeout_minutes * 60 * 1000
}

export const AuthenticatedUserWrapper = ({
  userId,
  inactivityTimeout = 0, // Default to 0 if not provided
}: AuthenticatedUserWrapperProps) => {
  const toggleTokenState = useRefreshTokenStatus().setInvalid
  const timeout_ms = getTimeoutMs(inactivityTimeout)

  // Invalidate the token on idle & set the access token to 'timed_out'
  const onIdleHandler = useCallback(() => {
    toggleTokenState()
    setAccessToken('timed_out')
  }, [toggleTokenState])

  const disable_timeout = timeout_ms === 0
  useIdleTimer({
    // Annoyingly, react-idle-timer doesn't allow 0 or Infinity, so we use 1 as a placeholder when disabled
    timeout: disable_timeout ? 1 : timeout_ms,
    disabled: disable_timeout,
    onIdle: onIdleHandler,
  })

  useWebsocket()

  return (
    <UserContext.Provider value={userId}>
    </UserContext.Provider>
  )
}