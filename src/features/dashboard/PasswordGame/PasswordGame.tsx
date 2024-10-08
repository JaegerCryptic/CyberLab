import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { appTheme } from "../../../theme/style"
import { checkRules, initialRules } from "./constants"
import PasswordInput from "./components/PasswordInput"
import RuleList from "./components/PasswordRuleList"

export const PasswordGame = () => {
	const [password, setPassword] = useState<string>("")
	const [rules, setRules] = useState(initialRules)
	const [hasStartedTyping, setHasStartedTyping] = useState(false)

	const PADDING = "32px"

	const handlePasswordChange = (newPassword: string): void => {
		setPassword(newPassword)

		if (!hasStartedTyping && newPassword.length > 0) {
			setHasStartedTyping(true)
		}

		const updatedRules = checkRules(newPassword, rules)
		setRules(updatedRules)
	}

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
				variant='h1'
				sx={{ mb: "32px", mt: "160px" }}
				textAlign='center'
			>
				The Password Game
			</Typography>

			<Box
				sx={{
					width: "75%",
					maxWidth: "800px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					mb: PADDING,
					mt: "48px",
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
				}}
			>
				{hasStartedTyping && <RuleList rules={rules} />}
			</Box>
		</Box>
	)
}
