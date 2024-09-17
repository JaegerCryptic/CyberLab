import { ReactNode } from 'react'
import { Container, useTheme } from '@mui/material'

import { LogoTitle } from '../../common/components/branding/LogoTitle'
import { Copyright } from '../../common/components/branding/Copyright'

/**
 * Wrapper for all startup pages to maintain consistent styling and provide logo, title, and copyright
 */

interface Props {
  title: string
  children: ReactNode
  hideProgressBar?: boolean
}

export const StartupLayout = ({ children, title }: Props) => {
  const theme = useTheme()

  return (
    <Container
      maxWidth="xs"
      component="main"
      sx={{
        marginTop: theme.spacing(8),
      }}
    >
      <LogoTitle title={title} />
      {children}
      <div style={{ marginTop: 15 }}>
        <Copyright />
      </div>
    </Container>
  )
}