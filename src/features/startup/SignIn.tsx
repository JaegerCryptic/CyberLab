import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Fade } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { z } from 'zod'

import { StartupLayout } from './StartupLayout'
import { CLButton } from '../../common/components/buttons/CLButton'
import { ControlledInput } from '../../common/components/inputs/ControlledInput'
import { ErrorMessage } from '../../common/components/ErrorMessage'
import { REQUIRED_FIELD_MESSAGE } from '../../constants/validation'


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
  })

  const [showTFAForm, setShowTFAForm] = useState(false)

  const formValues = watch()

  const handleOnSubmit: SubmitHandler<EmailLoginSchema> = (data) => {
    
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