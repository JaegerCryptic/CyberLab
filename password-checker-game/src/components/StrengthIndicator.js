import React from 'react';
import Typography from '@mui/material/Typography';

const StrengthIndicator = ({ strength }) => {
  return (
    <div>
      <Typography variant="h6">Password Strength</Typography>
      <Typography variant="body2">
        Estimated time to crack: {strength}
      </Typography>
    </div>
  );
};

export default StrengthIndicator;
