import React from 'react';
import TextField from '@mui/material/TextField';

const PasswordInput = ({ password, setPassword, label = "Enter your password" }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      type="password"
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      margin="normal"
    />
  );
};

export default PasswordInput;
