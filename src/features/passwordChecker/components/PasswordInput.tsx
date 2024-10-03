import React from 'react';
import TextField from '@mui/material/TextField';
import { appTheme } from '../../../theme/style'; // Adjust path if needed

interface PasswordInputProps {
  password: string;
  setPassword: (newPassword: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword }) => {
  return (
    <TextField
      fullWidth
      label="Enter Password"
      variant="outlined"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      InputLabelProps={{
        shrink: password.length > 0 ? true : undefined,
        style: { color: appTheme.colors.textAccent },
      }}
      inputProps={{
        style: {
          color: appTheme.colors.text,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#4A4A4A', // Darker gray for the default border
            borderWidth: '2px', // Thicker border
          },
          '&:hover fieldset': {
            borderColor: '#606060', // Darker gray on hover
            borderWidth: '2px', // Keep thickness on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4A4A4A', // Ensure border color stays dark gray when focused
            borderWidth: '2px', // Keep thickness when focused
          },
        },
        '& .MuiInputLabel-root': {
          color: appTheme.colors.textAccent, // Label color when not focused
        },
        '& .MuiOutlinedInput-input': {
          color: appTheme.colors.text, // Input text color
        },
      }}
    />
  );
};

export default PasswordInput;
