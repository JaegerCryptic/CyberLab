import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { Icon, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { z } from 'zod'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {
  englishDataset,
  englishRecommendedTransformers,
  RegExpMatcher,
} from 'obscenity'
import { zodResolver } from '@hookform/resolvers/zod'

import { StartupLayout } from './StartupLayout'
import { CLButton } from '../../common/components/buttons/CLButton'
import { ControlledInput } from '../../common/components/input/ControlledInput'
import { REQUIRED_FIELD_MESSAGE } from '../../constants/validation'
import SCPLogo from '../../images/scp_logo.png'
import SCPLogoWSlogan from '../../images/scp_logo_w_slogan.png' // Import the new image

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
})

const LoginSchema = z
  .object({
    userName: z
      .string({ required_error: REQUIRED_FIELD_MESSAGE })
      .min(1, { message: 'Username cannot be empty' })
      .refine((value) => value.trim().length > 0, {
        message: 'Username cannot be just whitespace',
      })
      .refine((value) => !matcher.hasMatch(value), {
        message: 'This username is not allowed.',
      }),
  })
  .strict()

type LoginSchema = z.infer<typeof LoginSchema>

type ButtonBehaviour = 'HYPERLINK' | 'BUTTON'
interface Props {
  buttonBehaviour: ButtonBehaviour
  buttonUpdate?: () => void
}

export const SignIn = ({}: Props) => {
  const queryClient = useQueryClient()
  const [cookies, setCookie] = useCookies(['userName'])
  const navigate = useNavigate()

  const maxWidth = '750px'

  useEffect(() => {
    queryClient.clear()
  }, [queryClient])

  const { control, handleSubmit } = useForm<LoginSchema>({
    mode: 'onSubmit',
    defaultValues: {
      userName: cookies.userName || '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const handleOnSubmit: SubmitHandler<LoginSchema> = (data) => {
    setCookie('userName', data.userName, { path: '/', maxAge: 86400 }) // Cookie expires in 1 day
    navigate('/dashboard')
  }

  return (
    <StartupLayout title='Welcome to the SCP Field Agent Certification course'>
      <Grid
        container
        direction='column'
        spacing={2}
        display='flex'
        alignItems='left'
        component='form'
        onSubmit={handleSubmit(handleOnSubmit)}
        width={'100vw'}
      >
        <Grid xs={6} display={'flex'} justifyContent={'left'} mt={2}>
          <Typography>Please enter your name to get started:</Typography>
        </Grid>
        <Grid
          xs={6}
          display={'flex'}
          justifyContent={'left'}
          maxWidth={maxWidth}
        >
          <ControlledInput<LoginSchema>
            control={control}
            defaultValue=''
            name='userName'
            inputProps={{
              label: 'name',
              autoFocus: true,
              autoComplete: 'given-name',
            }}
          />
        </Grid>

        <Grid
          xs={6}
          display={'flex'}
          justifyContent={'center'}
          maxWidth={maxWidth}
        >
          <CLButton fullWidth type='submit'>
            Sign in
          </CLButton>
        </Grid>
        <Grid xs={6} display={'block'} justifyContent={'left'} mt={5}>
          <Icon sx={{ width: '100%', height: '100%' }}>
            <img
              src={SCPLogo}
              alt='Logo'
              style={{
                width: '83.5%',
                height: '100%',
                marginLeft: -350,
              }}
            />
          </Icon>
        </Grid>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 1200,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={SCPLogoWSlogan}
            alt='SCP Logo with slogan'
            style={{
              width: '45vw',
              height: 'auto',
            }}
          />
        </div>
      </Grid>
      {/* extra <div> is required to prevent forwardRef error */}
      <div></div>
    </StartupLayout>
  )
}
