import React, { useState } from 'react';
import PasswordInput from './components/PasswordInput';
import StrengthIndicator from './components/StrengthIndicator';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [timeToCrack, setTimeToCrack] = useState('');
  const [bgColor, setBgColor] = useState('blue');

  const calculateStrength = (password) => {
    if (password.length === 0) {
      setTimeToCrack('0 seconds');
      setBgColor('blue');
      return;
    }

    const length = password.length;
    let characterSetSize = 0;

    // Determine the character set size
    if (/[a-z]/.test(password)) characterSetSize += 26; // Lowercase letters
    if (/[A-Z]/.test(password)) characterSetSize += 26; // Uppercase letters
    if (/\d/.test(password)) characterSetSize += 10; // Digits
    if (/[\W_]/.test(password)) characterSetSize += 32; // Symbols

    // Estimate time to brute force based on character set size and length
    const guessesPerSecond = 1e9; // 1 billion guesses per second
    const totalGuesses = Math.pow(characterSetSize, length);
    let timeToCrackInSeconds = totalGuesses / guessesPerSecond;

    // Check for Infinity (i.e., time to crack is too large)
    if (!isFinite(timeToCrackInSeconds)) {
      setTimeToCrack('Infinity');
      setBgColor('black');
      return;
    }

    // Convert time to a more readable format with metric prefixes and human-readable units
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

    // Determine background color based on time to crack
    if ((selectedUnit === 'weeks' && timeValue >= 1) || selectedUnit.includes('months') || selectedUnit.includes('years')) {
      setBgColor('green');
    } else {
      setBgColor('red');
    }

    setTimeToCrack(`${timeValue.toFixed(2)} ${selectedUnit}`);
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  return (
    <Container
      sx={{
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor, // Set the background color of the entire container
        transition: 'background-color 0.3s', // Smooth transition for background color changes
        padding: 0, // Remove any default padding
        margin: 0, // Remove any default margin
      }}
      maxWidth={false} // Disable max-width to ensure it covers the entire width
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,  // Increased width
          backgroundColor: 'white', // Set the box to a solid white background
          padding: 6, // Increased padding
          borderRadius: 3,
          color: 'black', // Set text color to black for better contrast on white background
          textAlign: 'center',
          fontSize: '1.5rem', // Larger font size for all text
          boxShadow: 3, // Add a slight shadow to the box for better visual separation
        }}
      >
        <PasswordInput password={password} setPassword={handlePasswordChange} />
        <StrengthIndicator strength={timeToCrack} />
      </Box>
    </Container>
  );
};

export default PasswordChecker;
