import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Fade } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { StartupLayout } from './StartupLayout'
import { CLButton } from '../../common/components/buttons/CLButton'
import { ControlledInput } from '../../common/components/inputs/ControlledInput'
import { ErrorMessage } from '../../common/components/ErrorMessage'

type EmailLoginSchema = {
  email: string
  password: string
}

type ButtonBehaviour = 'HYPERLINK' | 'BUTTON'
interface Props {
  buttonBehaviour: ButtonBehaviour
  buttonUpdate?: () => void
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const SignIn = ({
  buttonBehaviour = 'HYPERLINK',
  buttonUpdate,
}: Props) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.clear()
  }, [queryClient])

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailLoginSchema>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  })

  const [showTFAForm, setShowTFAForm] = useState(false)

  const formValues = watch()

  const handleOnSubmit: SubmitHandler<EmailLoginSchema> = (data) => {
    loginUser.mutate(data)
  }

  return (
    <StartupLayout title="Sign in">
      {!showTFAForm && (
        <Grid
          container
          direction="column"
          spacing={2}
          display="flex"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
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
            {errors.email && <ErrorMessage message={errors.email.message} />}
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
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </Grid>

          <Grid xs={12} display={'flex'} justifyContent={'center'}>
            <CLButton
              fullWidth
              type="submit"
            >
              Sign in
            </CLButton>
          </Grid>
          <Grid xs={12} display="flex" justifyContent="space-between">
            {buttonBehaviour === 'HYPERLINK' && (
              <>
                
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
              </div>
            )}
          </Grid>
        </Grid>
      )}
      <Fade in={showTFAForm} mountOnEnter unmountOnExit>
        {/* extra <div> is required to prevent forwardRef error */}
        <div>
        </div>
      </Fade>
    </StartupLayout>
  )
}