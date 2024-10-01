import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import StrengthIndicator from './StrengthIndicator';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const PasswordChecker = () => {
  const [password, setPassword] = useState<string>('');
  const [timeToCrack, setTimeToCrack] = useState<string>('0 seconds');
  const [bgColor, setBgColor] = useState<string>('blue');

  const calculateStrength = (password: string): void => {
    if (password.length === 0) {
      setTimeToCrack('0 seconds');
      setBgColor('blue');
      return;
    }

	const getCharacterSetSize = (password: string): number => {
		let size = 0
		if (/[a-z]/.test(password)) size += 26
		if (/[A-Z]/.test(password)) size += 26
		if (/\d/.test(password)) size += 10
		if (/[\W_]/.test(password)) size += 32
		return size
	}
    const guessesPerSecond = 1e9;
    const totalGuesses = Math.pow(characterSetSize, length);
    let timeToCrackInSeconds = totalGuesses / guessesPerSecond;

    if (!isFinite(timeToCrackInSeconds)) {
      setTimeToCrack('Infinity');
      setBgColor('black');
      return;
    }

    const timeUnits = [
      { unit: 'nanoseconds', value: 1e-9 },
      { unit: 'microseconds', value: 1e-6 },
      { unit: 'milliseconds', value: 1e-3 },
      { unit: 'seconds', value: 1 },
      { unit: 'minutes', value: 60 },
      { unit: 'hours', value: 60 * 60 },
      { unit: 'days', value: 60 * 60 * 24 },
      { unit: 'weeks', value: 60 * 60 * 24 * 7 },
      { unit: 'months', value: 60 * 60 * 24 * 30 },
      { unit: 'years', value: 60 * 60 * 24 * 365 },
      { unit: 'million years', value: 60 * 60 * 24 * 365 * 1e6 },
      { unit: 'billion years', value: 60 * 60 * 24 * 365 * 1e9 },
      { unit: 'trillion years', value: 60 * 60 * 24 * 365 * 1e12 },
      { unit: 'quadrillion years', value: 60 * 60 * 24 * 365 * 1e15 },
      { unit: 'quintillion years', value: 60 * 60 * 24 * 365 * 1e18 },
      { unit: 'sextillion years', value: 60 * 60 * 24 * 365 * 1e21 },
      { unit: 'septillion years', value: 60 * 60 * 24 * 365 * 1e24 },
    ];

    let selectedUnit = 'seconds';
    let timeValue = timeToCrackInSeconds;

    for (let i = 0; i < timeUnits.length; i++) {
      if (timeToCrackInSeconds < timeUnits[i].value) break;
      selectedUnit = timeUnits[i].unit;
      timeValue = timeToCrackInSeconds / timeUnits[i].value;
    }

    if ((selectedUnit === 'weeks' && timeValue >= 1) || selectedUnit.includes('months') || selectedUnit.includes('years')) {
      setBgColor('green');
    } else {
      setBgColor('red');
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
          backgroundColor: 'white',
          padding: 6,
          borderRadius: 3,
          color: 'black',
          textAlign: 'center',
          fontSize: '1.5rem',
          boxShadow: 3,
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"  // Slightly bigger size
          component="div"
          fontWeight="bold"
          gutterBottom
           sx={{ color: 'black' }}
        >
          Password Strength Checker
        </Typography>

        {/* Password Input */}
        <PasswordInput password={password} setPassword={handlePasswordChange} />

        {/* Strength Indicator */}
        <StrengthIndicator strength={timeToCrack} />
      </Box>
    </Container>
  );
};

