import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { appTheme } from "../../../../theme/style";

interface PasswordInputProps {
  password: string;
  setPassword: (newPassword: string) => void;
}

// Function to count the actual length of the password, treating emojis and special characters as single units
const getActualLength = (password: string): number => {
  return [...password].length; // Spread operator converts emojis and special characters into single units
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const SPACING = "16px";
  
  return (
    <Box
      sx={{
        width: "100%",
        mb: SPACING,
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        label="Please choose a password"
        variant="outlined"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        multiline
        minRows={1}
        maxRows={4}
        sx={{
          flexGrow: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Set rounded corners (no duplicate)
            "& fieldset": {
              borderColor: appTheme.colors.secondary,
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderColor: appTheme.colors.secondary,
            },
            "&.Mui-focused fieldset": {
              borderColor: appTheme.colors.secondary,
            },
          },
          "& .MuiInputLabel-root": { color: appTheme.colors.text },
          "& .MuiOutlinedInput-input": { color: appTheme.colors.text },
        }}
      />

      {/* Character Counter */}
      <Typography
        variant="body1"
        sx={{
          ml: SPACING,
          color: appTheme.colors.primary,
          whiteSpace: "nowrap",
        }}
      >
        {getActualLength(password)}
      </Typography>
    </Box>
  );
};

export default PasswordInput;
