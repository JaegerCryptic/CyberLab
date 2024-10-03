import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { appTheme } from '../../../theme/style'; // Adjusted path to your style

interface StrengthIndicatorProps {
  strength: string;
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ strength }) => {
  const theme = useTheme(); // Use theme for styling

  return (
    <Typography
      variant="h6"
      sx={{
        color: appTheme.colors.text, // Use the theme's text color
        marginTop: theme.spacing(2), // Use theme spacing for margin
      }}
    >
      Estimated time to crack: {strength}
    </Typography>
  );
};

export default StrengthIndicator;
