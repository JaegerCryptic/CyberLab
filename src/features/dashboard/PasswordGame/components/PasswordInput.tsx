import React from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles" // Import theme

interface PasswordInputProps {
	password: string
	setPassword: (newPassword: string) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	password,
	setPassword,
}) => {
	const theme = useTheme() // Access the theme

	return (
		<Box
			sx={{
				width: "100%",
				mb: theme.spacing(2),
				display: "flex",
				alignItems: "center",
			}}
		>
			{/* TextField for the password input with multi-line behavior */}
			<TextField
				fullWidth
				label='Please choose a password'
				variant='outlined'
				type='text' // Display the password in plain text
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				multiline // Enables multiline/textarea behavior
				minRows={1} // Minimum of 1 row, will expand as more characters are typed
				maxRows={4} // Limit the number of rows to 4, or adjust as needed
				sx={{
					flexGrow: 1,
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: theme.palette.text.primary, // Use theme text color
							borderWidth: 2, // Keep the border slightly thicker
						},
						"&:hover fieldset": {
							borderColor: theme.palette.text.primary, // Keep border color from theme on hover
						},
						"&.Mui-focused fieldset": {
							borderColor: theme.palette.text.primary, // Keep border color from theme when focused
						},
					},
					"& .MuiInputLabel-root": { color: theme.palette.text.primary }, // Use theme color for label
					"& .MuiOutlinedInput-input": { color: theme.palette.text.primary }, // Use theme color for input text
				}}
			/>

			{/* Character Counter (outside the input box, aligned right) */}
			<Typography
				variant='body1'
				sx={{
					ml: theme.spacing(2), // Add some spacing between the text field and counter using theme spacing
					color: theme.palette.text.primary, // Use theme color for counter text
					whiteSpace: "nowrap",
				}}
			>
				{password.length}
			</Typography>
		</Box>
	)
}

export default PasswordInput
