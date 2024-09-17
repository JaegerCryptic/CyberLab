import { useCallback } from 'react'
import { Fade } from '@mui/material'

import { CLDialog } from './CLDialog'
import { SignIn } from '../../../features/startup/SignIn'
import { useRefreshTokenStatus } from '../../utils/useRefreshTokenStatus'

interface Props {
  toggleForgotPassword: () => void
}

const Body = (props: Props) => {
  const { toggleForgotPassword } = props
  return (
    <div style={{ marginTop: -40 }}>
      <Fade in={true}>
        <div>
          <SignIn buttonBehaviour="BUTTON" buttonUpdate={toggleForgotPassword} />
        </div>
      </Fade>
    </div>
  )
}

const AuthenticationModal = () => {
  const valid = useRefreshTokenStatus((state) => state.valid)

  const toggleForgotPassword = useCallback(() => {
    // No-op function since forgot password logic is removed
  }, [])

  return (
    <>
      {!valid && (
        <CLDialog
          maxWidth="xs"
          title=""
          body={<Body toggleForgotPassword={toggleForgotPassword} />}
          actions={<></>}
        />
      )}
    </>
  )
}

export default AuthenticationModal