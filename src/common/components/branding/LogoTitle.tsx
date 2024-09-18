import { Typography } from '@mui/material'

//import logo from '../../../images/favicon.png' TODO

interface LogoTitleProps {
  title: string
}

export const LogoTitle = ({ title }: LogoTitleProps) => {
  return (
    <>
      <Typography
        variant='h1'
        align='left'
        style={{
          margin: 45,
          lineHeight: 1.5,
        }}
      >
        {title}
      </Typography>
    </>
  )
}
