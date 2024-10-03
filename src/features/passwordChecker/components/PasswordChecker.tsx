import React, { useState } from 'react';
import PasswordInput from './PasswordInput'; // Adjusted path to PasswordInput
import StrengthIndicator from './StrengthIndicator'; // Adjusted path to StrengthIndicator
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { timeUnits } from '../constants/constants'; // Adjusted path to constants
import {
  getCharacterSetSize,
  getTimeToCrack,
  getTimeUnitAndValue,
  getBackgroundColor
} from '../helpers/helpers'; // Adjusted path to helpers

const guessesPerSecond = 1e9;

export const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState<string>(''); // Initialize state
  const [timeToCrack, setTimeToCrack] = useState<string>('0 seconds');
  const [bgColor, setBgColor] = useState<string>('blue');

  const calculateStrength = (password: string): void => {
    if (password.length === 0) {
      setTimeToCrack('0 seconds');
      setBgColor('blue');
      return;
    }

    const length = password.length;
    const characterSetSize = getCharacterSetSize(password);

    const timeToCrackInSeconds = getTimeToCrack(characterSetSize, length, guessesPerSecond);

    if (!isFinite(timeToCrackInSeconds)) {
      setTimeToCrack('Infinity');
      setBgColor('black');
      return;
    }

    const { selectedUnit, timeValue } = getTimeUnitAndValue(timeToCrackInSeconds, timeUnits);

    const backgroundColor = getBackgroundColor(selectedUnit, timeValue);
    setBgColor(backgroundColor);

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
          backgroundColor: 'white',
          padding: 6,
          borderRadius: 3,
          color: 'black',
          textAlign: 'center',
          fontSize: '1.5rem',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          gutterBottom
          sx={{ color: 'black' }}
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
