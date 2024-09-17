import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Fade, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { z } from 'zod'

import { StartupLayout } from './StartupLayout'
import { CLButton } from '../../common/components/buttons/CLButton'
import { ControlledInput } from '../../common/components/input/ControlledInput'
import { ErrorMessage } from '../../common/components/ErrorMessage'
import { REQUIRED_FIELD_MESSAGE } from '../../constants/validation'


const LoginSchema = z
  .object({
    userName: z.string({ required_error: REQUIRED_FIELD_MESSAGE }),
  })
  .strict()

type LoginSchema = z.infer<typeof LoginSchema>

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
  } = useForm<LoginSchema>({
    mode: 'onSubmit',
  })

  const [showTFAForm, setShowTFAForm] = useState(false)


  const handleOnSubmit: SubmitHandler<LoginSchema> = (data) => {
    
  }

  return (
    <StartupLayout title="Welcome to Griffith Uni Cyber Security challenge">
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
          <Grid xs={12} display={'flex'} justifyContent={'left'}>
            <Typography>Please enter your name here</Typography>
        </Grid>
          <Grid xs={12} display={'flex'} justifyContent={'center'}>
            <ControlledInput<LoginSchema>
              control={control}
              defaultValue=""
              name='userName'
              inputProps={{
                label: 'Name',
                autoFocus: true,
                autoComplete: 'firstName',
              }}
            />
            {errors.userName && <ErrorMessage message={errors.userName.message ?? ''} />}
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