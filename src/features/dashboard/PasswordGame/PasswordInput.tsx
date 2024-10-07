import TextField from "@mui/material/TextField"

import { appTheme } from "../../../theme/style"

interface PasswordInputProps {
	password: string
	setPassword: (newPassword: string) => void
}

export const PasswordInput = (props: PasswordInputProps) => {
	const { password, setPassword } = props
	return (
		<TextField
			fullWidth
			label='Enter Password'
			variant='outlined'
			type='password'
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			InputLabelProps={{
				shrink: password.length > 0 ? true : undefined,
				style: { color: appTheme.colors.textAccent },
			}}
			inputProps={{
				style: {
					color: appTheme.colors.text,
				},
			}}
			sx={{
				"& .MuiOutlinedInput-root": {
					"& fieldset": {
						borderColor: "#4A4A4A",
						borderWidth: "2px",
					},
					"&:hover fieldset": {
						borderColor: "#606060",
						borderWidth: "2px",
					},
					"&.Mui-focused fieldset": {
						borderColor: "#4A4A4A",
						borderWidth: "2px",
					},
				},
				"& .MuiInputLabel-root": {
					color: appTheme.colors.textAccent,
				},
				"& .MuiOutlinedInput-input": {
					color: appTheme.colors.text,
				},
			}}
		/>
	)
}
