import React from 'react';
import Typography from '@mui/material/Typography';

interface StrengthIndicatorProps {
  strength: string;
}

const StrengthIndicator = (props: StrengthIndicatorProps) => {
 const { strength} = props
  return (
    <Typography
      variant="h6"  // Larger text size
      style={{ color: '#4a4a4a', marginTop: '1rem' }}  // Darker gray text
    >
      Estimated time to crack: {strength}
    </Typography>
  );
};

export default StrengthIndicator;
