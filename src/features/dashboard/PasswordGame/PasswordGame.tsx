import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { appTheme } from "../../../theme/style";
import { checkRules, initialRules } from "./constants";
import PasswordInput from "./components/PasswordInput";
import RuleList from "./components/PasswordRuleList";

export const PasswordGame = () => {
  const [password, setPassword] = useState<string>("");
  const [rules, setRules] = useState(initialRules);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [bombTimer, setBombTimer] = useState<number | null>(null);
  const [bombsAdded, setBombsAdded] = useState(false);
  const [allBombsRemoved, setAllBombsRemoved] = useState(false); // New state to track bomb removal

  const PADDING = "32px";

  const handlePasswordChange = (newPassword: string): void => {
    setPassword(newPassword);

    if (!hasStartedTyping && newPassword.length > 0) {
      setHasStartedTyping(true);
    }

    const updatedRules = checkRules(newPassword, rules);
    setRules(updatedRules);

    // Check if all bombs have been deleted
    if (bombsAdded && !newPassword.includes('💣')) {
      setAllBombsRemoved(true);
      setBombTimer(null); // Stop the timer once all bombs are removed
    }
  };

  // Function to add bombs to the password randomly without replacing any characters
  const addBombsToPassword = (password: string, numberOfBombs: number) => {
    const bombEmoji = '💣';
    let updatedPassword = password;

    // Only allow bombs in alphabetic and numeric positions
    const validIndices = [...password].map((char, index) => {
      return /[a-zA-Z0-9]/.test(char) ? index : -1; // Only index letters and numbers
    }).filter(index => index !== -1); // Remove invalid positions

    // Insert bombs in valid positions without breaking the characters
    for (let i = 0; i < numberOfBombs && validIndices.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * validIndices.length);
      const bombPosition = validIndices[randomIndex];
      validIndices.splice(randomIndex, 1); // Remove used position

      updatedPassword = [
        updatedPassword.slice(0, bombPosition + i),
        bombEmoji,
        updatedPassword.slice(bombPosition + i)
      ].join('');
    }

    return updatedPassword;
  };

  // Function to replace the entire password with explosion emojis
  const explodePassword = (password: string) => {
    const explosionEmoji = '💥';
    return [...password].map(() => explosionEmoji).join(''); // Replace each character with 💥
  };

  useEffect(() => {
    // Rule 33: When this rule is revealed, add bombs and start a timer
    if (rules[32].revealed && !bombsAdded) {
      setPassword((prevPassword) => addBombsToPassword(prevPassword, 15)); // Add 15 bombs randomly
      setBombTimer(10); // Set timer to 10 seconds
      setBombsAdded(true); // Ensure bombs are only added once
    }
  }, [rules, bombsAdded]);

  useEffect(() => {
    // Bomb timer countdown logic
    if (bombTimer !== null && bombTimer > 0 && !allBombsRemoved) {
      const timer = setTimeout(() => {
        setBombTimer(bombTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // If the timer reaches 0, replace password with explosion emojis
    if (bombTimer === 0) {
      setPassword(explodePassword(password)); // Replace current characters with 💥
    }
  }, [bombTimer, password, allBombsRemoved]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: appTheme.colors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: PADDING,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{ mb: "32px", mt: "160px", color: appTheme.colors.text }}
        textAlign="center"
      >
        The Password Game
      </Typography>

      {!allBombsRemoved && bombTimer !== null && bombTimer > 0 && (
        <Typography
          variant="h6"
          sx={{ color: appTheme.colors.error.main }}
        >
          Bombs are about to explode in {bombTimer} seconds!
        </Typography>
      )}

      {allBombsRemoved && (
        <Typography
          variant="h6"
          sx={{ color: appTheme.colors.success.main }}
        >
          You saved Paul by deleting all the bombs! 🎉
        </Typography>
      )}

      <Box
        sx={{
          width: "100%",
          maxWidth: 780,
          backgroundColor: appTheme.colors.backgroundAccent,
          padding: "48px",
          borderRadius: "8px",
          color: appTheme.colors.text,
          textAlign: "center",
          fontSize: appTheme.fontSize.bodyText,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          border: `6px solid ${appTheme.colors.secondary}`,
          marginRight: "20px",
        }}
      >
        <PasswordInput password={password} setPassword={handlePasswordChange} />
      </Box>

      <Box
        sx={{
          width: "75%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: PADDING,
        }}
      >
        {hasStartedTyping && <RuleList rules={rules} />}
      </Box>
    </Box>
  );
};
