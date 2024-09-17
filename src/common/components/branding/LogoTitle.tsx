import { Typography } from '@mui/material'

//import logo from '../../../images/favicon.png' TODO

interface LogoTitleProps {
  title: string
}

export const LogoTitle = ({ title }: LogoTitleProps) => {
  return (
    <>
      <a
        href="/"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://via.placeholder.com/60" // Placeholder image URL
          alt="Logo"
          style={{
            height: 60,
            width: 60,
            marginLeft: 7, // This is because the logo is asymmetric
          }}
        />
      </a>
      <Typography
        variant="h3"
        align="center"
        style={{
          margin: 20,
        }}
      >
        {title}
      </Typography>
    </>
  )
}
