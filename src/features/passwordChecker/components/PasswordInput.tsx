import React from 'react';
import TextField from '@mui/material/TextField';

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
    />
  );
};

export default PasswordInput;
