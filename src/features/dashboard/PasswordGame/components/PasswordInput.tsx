import React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { appTheme } from '../../../../theme/style'

interface PasswordInputProps {
  password: string
  setPassword: (newPassword: string) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const SPACING = '16px'
  return (
    <Box
      sx={{
        width: '100%',
        mb: SPACING,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        label='Please choose a password'
        variant='outlined'
        type='text'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        multiline
        minRows={1}
        maxRows={4}
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: appTheme.colors.primary,
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: appTheme.colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: appTheme.colors.primary,
            },
          },
          '& .MuiInputLabel-root': { color: appTheme.colors.primary },
          '& .MuiOutlinedInput-input': { color: appTheme.colors.primary },
        }}
      />

      <Typography
        variant='body1'
        sx={{
          ml: SPACING,
          color: appTheme.colors.primary,
          whiteSpace: 'nowrap',
        }}
      >
        {password.length}
      </Typography>
    </Box>
  )
}

export default PasswordInput
