import React from 'react';
import TextField from '@mui/material/TextField';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword }) => {
  return (
    <TextField
      variant="outlined"
      type="password"
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter password"
      inputProps={{ style: { color: '#4a4a4a' } }}  // Darker gray text
      margin="normal"
    />
  );
};

export default PasswordInput;
