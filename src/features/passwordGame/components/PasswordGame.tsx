import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import RuleList from './RuleList';
import { initialRules, checkRules } from '../helpers/rules';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { h1Style } from '../../../theme/style';

const PasswordGame: React.FC = () => {
  const [password, setPassword] = useState<string>(''); // Store user password
  const [rules, setRules] = useState(initialRules); // Initialize rules
  const [hasStartedTyping, setHasStartedTyping] = useState(false); // Track if the user started typing
  const theme = useTheme(); // Use theme for styling

  const handlePasswordChange = (newPassword: string): void => {
    setPassword(newPassword);

    // Only show rules once the user has started typing
    if (!hasStartedTyping && newPassword.length > 0) {
      setHasStartedTyping(true);
    }

    const updatedRules = checkRules(newPassword, rules);
    setRules(updatedRules);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        overflowY: 'auto', // Allow the whole page to scroll naturally
      }}
    >
      {/* Title */}
      <Typography
        sx={{ ...h1Style, mb: theme.spacing(4), mt: theme.spacing(20) }} // Applied global h1 style from theme
        textAlign="center"
      >
        The Password Game
      </Typography>

      {/* Password Input */}
      <Box
        sx={{
          width: '75%', // Centered width
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: theme.spacing(4),
          mt: theme.spacing(6), // Add margin to move input box slightly lower
        }}
      >
        <PasswordInput password={password} setPassword={handlePasswordChange} />
      </Box>

      {/* Rule List: Make the rules naturally expand down */}
      <Box
        sx={{
          width: '75%', // Keep the same width as the input box
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {hasStartedTyping && <RuleList rules={rules} />}
      </Box>
    </Box>
  );
};

export default PasswordGame;
