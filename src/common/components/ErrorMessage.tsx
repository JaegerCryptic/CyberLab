import { ErrorOutline } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

interface Props {
  message: string
}

export const ErrorMessage = ({ message }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ErrorOutline color="error" sx={{ marginRight: 1 }} />
      <Typography variant="body2" color="error">
        {message}
      </Typography>
    </Box>
  )
}
