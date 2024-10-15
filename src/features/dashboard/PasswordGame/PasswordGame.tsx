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
  const [allBombsRemoved, setAllBombsRemoved] = useState(false);
  const [bombsExploded, setBombsExploded] = useState(false); // Track if bombs exploded
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Track message display
  const [showFailMessage, setShowFailMessage] = useState(false); // Track fail message display

  const PADDING = "32px";

  const handlePasswordChange = (newPassword: string): void => {
    setPassword(newPassword);

    if (!hasStartedTyping && newPassword.length > 0) {
      setHasStartedTyping(true);
    }

    // Check if all bombs have been deleted
    if (bombsAdded && !newPassword.includes('💣') && !bombsExploded) {
      setAllBombsRemoved(true);
      setBombTimer(null); // Stop the timer once all bombs are removed
      setShowSuccessMessage(true); // Show the success message when all bombs are removed
      setTimeout(() => setShowSuccessMessage(false), 5000); // Hide the message after 5 seconds
    }

    const updatedRules = checkRules(newPassword, rules);
    setRules(updatedRules);
  };

  // Function to add bombs more evenly, avoiding special characters, other emojis, or existing bombs
  const addBombsToPassword = (password: string, numberOfBombs: number) => {
    const bombEmoji = '💣';
    let updatedPassword = [...password]; // Convert to array to work with individual characters
    let insertCount = 0;
    const positions = new Set<number>();

    // Helper function to check if a position is valid for bomb insertion
    const isValidPosition = (char: string, pos: number) => {
      const before = password[pos - 1] || '';
      const after = password[pos + 1] || '';
      return (
        /[a-zA-Z0-9]/.test(char) && // Only insert bombs between alphanumeric characters
        !/[💣()🥚]/.test(before) && // Avoid bombs next to special characters like parentheses or emojis
        !/[💣()🥚]/.test(after)
      );
    };

    // Randomly select positions to insert bombs, ensuring they are spread out and valid
    while (insertCount < numberOfBombs) {
      const randomPosition = Math.floor(Math.random() * updatedPassword.length);

      // Only insert bombs if the position is valid
      if (!positions.has(randomPosition) && isValidPosition(updatedPassword[randomPosition], randomPosition)) {
        positions.add(randomPosition);
        updatedPassword.splice(randomPosition + insertCount, 0, bombEmoji); // Insert bomb into valid position
        insertCount++;
      }
    }

    return updatedPassword.join(''); // Join array back to string
  };

  // Function to replace the entire password with explosion emojis
  const explodePassword = (password: string) => {
    const explosionEmoji = '💥';
    return [...password].map(() => explosionEmoji).join(''); // Replace each character with 💥
  };

  useEffect(() => {
    // Rule 33: Add bombs and start a timer when this rule is revealed
    if (rules[32].revealed && !bombsAdded) {
      setPassword((prevPassword) => addBombsToPassword(prevPassword, 15)); // Add 15 bombs
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
      setBombsExploded(true); // Mark that the bombs have exploded
      setShowFailMessage(true); // Show failure message
      setTimeout(() => setShowFailMessage(false), 5000); // Hide failure message after 5 seconds
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

      {showSuccessMessage && (
        <Typography
          variant="h6"
          sx={{ color: appTheme.colors.success.main }}
        >
          You saved Paul by deleting all the bombs! 🎉
        </Typography>
      )}

      {showFailMessage && (
        <Typography
          variant="h6"
          sx={{ color: appTheme.colors.error.main }}
        >
          You failed to save Paul. The bombs exploded! 💥💥💥
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
