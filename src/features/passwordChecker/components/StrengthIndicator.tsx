import React from 'react';
import Typography from '@mui/material/Typography';

interface StrengthIndicatorProps {
  strength: string;
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ strength }) => {
  return (
    <Typography variant="h6" style={{ color: '#4a4a4a', marginTop: '1rem' }}>
      Estimated time to crack: {strength}
    </Typography>
  );
};

export default StrengthIndicator;
