import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Fade } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { z } from 'zod'

import { clearTokens } from '../../common/utils/tokens'
import { StartupLayout } from './StartupLayout'
import { FWButton } from '../../common/components/buttons/FWButton'
import { ControlledInput } from '../../common/components/inputs/ControlledInput'
import { TwoFactorAuthentication } from './components/TwoFactorAuthentication'
import { useAuth } from '../../models/user/useAuth'
import { REQUIRED_FIELD_MESSAGE } from '../../constants/validation'
import { ErrorMessage } from '../../common/components/ErrorMessage'
import { FWRouterLink } from '../../common/components/buttons/FWRouterLink'

const EmailLoginSchema = z
  .object({
    email: z.string({ required_error: REQUIRED_FIELD_MESSAGE }),
    password: z.string({ required_error: REQUIRED_FIELD_MESSAGE }),
  })
  .strict()

type EmailLoginSchema = z.infer<typeof EmailLoginSchema>

type ButtonBehaviour = 'HYPERLINK' | 'BUTTON'
interface Props {
  buttonBehaviour: ButtonBehaviour
  buttonUpdate?: () => void
}

export const SignIn = ({
  buttonBehaviour = 'HYPERLINK',
  buttonUpdate,
}: Props) => {
  const queryClient = useQueryClient()
  const redirectOnSuccess: boolean = buttonBehaviour === 'HYPERLINK'

  useEffect(() => {
    clearTokens()
    queryClient.clear()
  }, [queryClient])

  const { increaseProgress } = useProgressStore()
  const { loginUser, verifyEmail, resendEmailVerification, verificationCode } =
    useAuth({ redirectOnSuccess })

  const { control, handleSubmit, watch } = useForm<EmailLoginSchema>({
    resolver: zodResolver(EmailLoginSchema),
    mode: 'onSubmit',
  })

  const [showTFAForm, setShowTFAForm] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)

  const errorMessage = useMemo(() => {
    if (loginUser.result.state !== 'error') {
      return ''
    }
    if (loginUser.result.error.type === 'APIError') {
      return loginUser.result.error.code === 401
        ? ''
        : 'Email or password is incorrect'
    }
    return 'Error authenticating user, please try again.'
  }, [loginUser.result])

  useEffect(() => {
    if (
      loginUser.result.state === 'success' &&
      loginUser.result.data.tfaRequired
    ) {
      setShowTFAForm(true)
    }
    if (
      loginUser.result.state === 'error' &&
      loginUser.result.error.type === 'APIError' &&
      loginUser.result.error.code === 401
    ) {
      setEmailValidation(true)
    }
  }, [loginUser])

  const formValues = watch()

  const handleOnSubmit = handleSubmit((data) => {
    loginUser.mutate(data)
  })

  return (
    <StartupLayout hideProgressBar title="Sign in">
      {!showTFAForm && !emailValidation && (
        <Grid
          container
          direction="column"
          spacing={2}
          display="flex"
          alignItems="center"
          component="form"
          onSubmit={handleOnSubmit}
        >
          <Grid xs={12} display={'flex'} justifyContent={'center'}>
            <ControlledInput<EmailLoginSchema>
              control={control}
              defaultValue=""
              name="email"
              inputProps={{
                label: 'Email',
                autoFocus: true,
                autoComplete: 'email',
              }}
            />
          </Grid>
          <Grid xs={12} display={'flex'} justifyContent={'center'}>
            <ControlledInput<EmailLoginSchema>
              control={control}
              name="password"
              defaultValue=""
              inputProps={{
                label: 'Password',
                type: 'password',
                autoComplete: 'current-password',
              }}
            />
          </Grid>
          {errorMessage && (
            <Grid xs={12} display={'flex'} alignItems={'center'}>
              <ErrorMessage message={errorMessage} />
            </Grid>
          )}

          <Grid xs={12} display={'flex'} justifyContent={'center'}>
            <FWButton
              fullWidth
              type="submit"
              disabled={
                loginUser.result.state === 'loading' ||
                !formValues.email ||
                !formValues.password
              }
              isLoading={loginUser.result.state === 'loading'}
            >
              Sign in
            </FWButton>
          </Grid>
          <Grid xs={12} display="flex" justifyContent="space-between">
            {buttonBehaviour === 'HYPERLINK' && (
              <>
                <FWRouterLink to={FORGOT_PASSWORD_PATH}>
                  Forgot password?
                </FWRouterLink>
                <FWRouterLink to={SIGNUP_ROUTE_PATH}>
                  Don&apos;t have an account? Sign up
                </FWRouterLink>
              </>
            )}
            {buttonBehaviour === 'BUTTON' && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <FWLink onClick={buttonUpdate}>Forgot password?</FWLink>
              </div>
            )}
          </Grid>
        </Grid>
      )}
      <Fade in={showTFAForm} mountOnEnter unmountOnExit>
        {/* extra <div> is required to prevent forwardRef error */}
        <div>
          <TwoFactorAuthentication credentials={formValues} />
        </div>
      </Fade>
      <Fade in={emailValidation} mountOnEnter unmountOnExit>
        <div>
          <EmailValidation
            verificationCode={verificationCode.code}
            updateCell={verificationCode.updateCell}
            codeIsValid={verifyEmail.result.state !== 'error'}
            isLoading={verifyEmail.result.state === 'loading'}
            onResend={() =>
              resendEmailVerification.mutate({ email: formValues.email })
            }
            onVerify={() =>
              verifyEmail.mutate(
                formValues.email,
                verificationCode.code.join(''),
                () => {
                  increaseProgress()
                  loginUser.mutate({
                    email: formValues.email,
                    password: formValues.password,
                  })
                }
              )
            }
            resendLoading={resendEmailVerification.result.state === 'loading'}
          />
        </div>
      </Fade>
    </StartupLayout>
  )
}
