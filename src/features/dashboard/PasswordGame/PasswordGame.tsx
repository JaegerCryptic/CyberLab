import { useState, useEffect } from "react";
import { Box, Typography, Modal, Button } from "@mui/material"; // Import Modal and Button from MUI
import { appTheme } from "../../../theme/style";
import { checkRules, initialRules } from "./constants";
import PasswordInput from "./components/PasswordInput";
import RuleList from "./components/PasswordRuleList";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: appTheme.colors.backgroundAccent,
  border: `2px solid ${appTheme.colors.secondary}`,
  boxShadow: 24,
  p: 4,
  color: appTheme.colors.text,
};

export const PasswordGame = () => {
  const [password, setPassword] = useState<string>("");
  const [rules, setRules] = useState(initialRules);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [bombTimer, setBombTimer] = useState<number | null>(null);
  const [bombsAdded, setBombsAdded] = useState(false);
  const [allBombsRemoved, setAllBombsRemoved] = useState(false);
  const [bombsExploded, setBombsExploded] = useState(false);
  const [explosionOccurred, setExplosionOccurred] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailMessage, setShowFailMessage] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false); // Modal for game completion
  const [successMessageShown, setSuccessMessageShown] = useState(false); // Track if success message has been shown

  const PADDING = "32px";

  // Reset game logic
  const resetGame = () => {
    setPassword("");
    setRules(initialRules);
    setHasStartedTyping(false);
    setBombTimer(null);
    setBombsAdded(false);
    setAllBombsRemoved(false);
    setBombsExploded(false);
    setExplosionOccurred(false);
    setShowSuccessMessage(false);
    setShowFailMessage(false);
    setIsCongratsModalOpen(false);
    setSuccessMessageShown(false); // Reset success message flag
  };

  const handlePasswordChange = (newPassword: string): void => {
    if (!bombsExploded || explosionOccurred) {
      setPassword(newPassword);

      if (!hasStartedTyping && newPassword.length > 0) {
        setHasStartedTyping(true);
      }

      // Check if all bombs have been deleted
      if (bombsAdded && !newPassword.includes("💣") && !bombsExploded && !successMessageShown) {
        setAllBombsRemoved(true);
        setBombTimer(null); // Stop the timer once all bombs are removed
        setShowSuccessMessage(true); // Show the success message when all bombs are removed
        setSuccessMessageShown(true); // Set the flag so the message is only shown once
        setTimeout(() => setShowSuccessMessage(false), 5000); // Hide the message after 5 seconds
      }

      const updatedRules = checkRules(newPassword, rules);
      setRules(updatedRules);

      // Check if all rules are met to show the final congratulations message
      const allMet = updatedRules.every((rule) => rule.met);
      if (allMet) {
        setIsCongratsModalOpen(true); // Open the congrats modal
      }
    }
  };

  // Function to add bombs to the password
  const addBombsToPassword = (password: string, numberOfBombs: number) => {
    const bombEmoji = "💣";
    let updatedPassword = [...password];
    let insertCount = 0;
    const positions = new Set<number>();

    const isValidPosition = (char: string, pos: number) => {
      const before = password[pos - 1] || "";
      const after = password[pos + 1] || "";
      return /[a-zA-Z0-9]/.test(char) && !/[💣()🐔]/.test(before) && !/[💣()🐔]/.test(after);
    };

    while (insertCount < numberOfBombs) {
      const randomPosition = Math.floor(Math.random() * updatedPassword.length);

      if (!positions.has(randomPosition) && isValidPosition(updatedPassword[randomPosition], randomPosition)) {
        positions.add(randomPosition);
        updatedPassword.splice(randomPosition + insertCount, 0, bombEmoji);
        insertCount++;
      }
    }

    return updatedPassword.join("");
  };

  const explodePassword = (password: string) => {
    const explosionEmoji = "💥";
    return [...password].map(() => explosionEmoji).join("");
  };

  useEffect(() => {
    if (rules[31].met && !bombsAdded) {
      const newPassword = addBombsToPassword(password, 15);
      setPassword(newPassword);
      setBombTimer(10);
      setBombsAdded(true);

      const updatedRules = checkRules(newPassword, rules);
      setRules(updatedRules);
    }
  }, [rules, bombsAdded, password]);

  useEffect(() => {
    if (bombTimer !== null && bombTimer > 0 && !allBombsRemoved) {
      const timer = setTimeout(() => {
        setBombTimer(bombTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (bombTimer === 0 && !explosionOccurred) {
      setPassword(explodePassword(password));
      setBombsExploded(true);
      setExplosionOccurred(true);
      setShowFailMessage(true);
      setTimeout(() => setShowFailMessage(false), 5000);
    }
  }, [bombTimer, password, allBombsRemoved, explosionOccurred]);

  // Reset the game when leaving the route
  useEffect(() => {
    return () => {
      resetGame(); // Reset game state when the component unmounts (route changes)
    };
  }, []);

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
      <Typography variant="h1" sx={{ mb: "32px", mt: "160px", color: appTheme.colors.text }} textAlign="center">
        The Password Game
      </Typography>

      {!allBombsRemoved && bombTimer !== null && bombTimer > 0 && (
        <Typography variant="h6" sx={{ color: appTheme.colors.error.main }}>
          Bombs are about to explode in {bombTimer} seconds!
        </Typography>
      )}

      {showSuccessMessage && (
        <Typography variant="h6" sx={{ color: appTheme.colors.success.main }}>
          You saved Paul by deleting all the bombs! 🎉
        </Typography>
      )}

      {showFailMessage && (
        <Typography variant="h6" sx={{ color: appTheme.colors.error.main }}>
          You failed to save Paul. The bombs exploded! 💥💥💥
        </Typography>
      )}

      {/* Modal for Congratulations */}
      <Modal open={isCongratsModalOpen} onClose={() => setIsCongratsModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Congratulations! 🎉</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            You have now built the ultimate password! Try testing it in the Password Checker and see how strong it is!
          </Typography>
          <Button
            onClick={() => setIsCongratsModalOpen(false)}
            sx={{ mt: 2, backgroundColor: appTheme.colors.success.main }}
          >
            OK
          </Button>
        </Box>
      </Modal>

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
