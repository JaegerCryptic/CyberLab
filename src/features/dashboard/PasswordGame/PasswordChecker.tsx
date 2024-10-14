import { useState } from "react";
import { appTheme } from "../../../theme/style";
import {
  getCharacterSetSize,
  getTimeToCrack,
  getTimeUnitAndValue,
} from "./helpers";
import { timeUnits } from "./constants";
import { Box, Container, Typography } from "@mui/material";
import { StrengthIndicator } from './components/StrengthIndicator';
import PasswordInput from "./components/PasswordInput";

const guessesPerSecond = 1e9;

export const PasswordChecker = () => {
  const [password, setPassword] = useState<string>("");
  const [timeToCrack, setTimeToCrack] = useState<string>("0 seconds");
  const [bgColor, setBgColor] = useState<string>(appTheme.colors.background);

  const calculateStrength = (password: string): void => {
    if (password.length === 0) {
      setTimeToCrack("0 seconds");
      setBgColor(appTheme.colors.background);
      return;
    }

    const length = password.length;
    const characterSetSize = getCharacterSetSize(password);
    const timeToCrackInSeconds = getTimeToCrack(
      characterSetSize,
      length,
      guessesPerSecond
    );

    if (!isFinite(timeToCrackInSeconds)) {
      setTimeToCrack("Infinity");
      setBgColor("black");
      return;
    }

    const { selectedUnit, timeValue } = getTimeUnitAndValue(
      timeToCrackInSeconds,
      timeUnits
    );

    if (timeToCrackInSeconds < 60 * 60 * 24 * 7) {
      setBgColor(appTheme.colors.error.dark);
    } else {
      setBgColor(appTheme.colors.success.main);
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
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        transition: "background-color 0.3s",
        padding: 0,
        margin: 0,
        // Add margin-top here to move the entire box higher
        // Example: marginTop: '-50px'
      }}
      maxWidth={false}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          backgroundColor: appTheme.colors.backgroundAccent,
          padding: "48px",
          borderRadius: "8px",
          color: appTheme.colors.text,
          textAlign: "center",
          fontSize: appTheme.fontSize.bodyText,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          border: `6px solid ${appTheme.colors.secondary}`,
		  marginTop: '-150px',
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
