import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import StrengthIndicator from './StrengthIndicator';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { timeUnits } from '../constants/constants';
import {
  getCharacterSetSize,
  getTimeToCrack,
  getTimeUnitAndValue,
} from '../helpers/helpers';
import { useTheme } from '@mui/material/styles';
import { appTheme } from '../../../theme/style';

const guessesPerSecond = 1e9;

export const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [timeToCrack, setTimeToCrack] = useState<string>('0 seconds');
  const [bgColor, setBgColor] = useState<string>(appTheme.colors.background);

  const theme = useTheme();

  const calculateStrength = (password: string): void => {
    if (password.length === 0) {
      setTimeToCrack('0 seconds');
      setBgColor(appTheme.colors.background);
      return;
    }

    const length = password.length;
    const characterSetSize = getCharacterSetSize(password);
    const timeToCrackInSeconds = getTimeToCrack(characterSetSize, length, guessesPerSecond);

    if (!isFinite(timeToCrackInSeconds)) {
      setTimeToCrack('Infinity');
      setBgColor('black'); // Infinity scenario, set to black
      return;
    }

    const { selectedUnit, timeValue } = getTimeUnitAndValue(timeToCrackInSeconds, timeUnits);

    // Consistent color logic: only dark red or dark green
    if (timeToCrackInSeconds < 60 * 60 * 24 * 7) {
      // If it takes less than a week to crack, it's weak (red)
      setBgColor(theme.palette.error.dark); // Use dark red
    } else {
      // If it takes more than a week, it's strong (green)
      setBgColor(theme.palette.success.dark); // Use dark green
    }

    setTimeToCrack(`${timeValue.toFixed(2)} ${selectedUnit}`);
  };

  const handlePasswordChange = (newPassword: string): void => {
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
        transition: 'background-color 0.3s',
        padding: 0,
        margin: 0,
      }}
      maxWidth={false}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          backgroundColor: appTheme.colors.backgroundAccent, // Use background accent from theme
          padding: theme.spacing(6),
          borderRadius: theme.shape.borderRadius,
          color: appTheme.colors.text,
          textAlign: 'center',
          fontSize: appTheme.fontSize.bodyText,
          boxShadow: theme.shadows[3],
          border: `6px solid ${appTheme.colors.secondary}`, // Add a thick dark gray border
        }}
      >
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          gutterBottom
          sx={{ color: appTheme.colors.text }}
        >
          Password Strength Checker
        </Typography>

        <PasswordInput password={password} setPassword={handlePasswordChange} />

        <StrengthIndicator strength={timeToCrack} />
      </Box>
    </Container>
  );
};

export default PasswordChecker;
