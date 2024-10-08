import { useState } from "react"
import { Box, Container, Typography } from "@mui/material"
import CryptoJS from "crypto-js"

import { appTheme } from "../../../theme/style"
import { CLTextInput } from "../../../common/components/input/CLTextInput"
import { CLButton } from "../../../common/components/buttons/CLButton"

export const Md5HashingCrackingGame = () => {
	const [password, setPassword] = useState<string>("")
	const [salt, setSalt] = useState<string>("")
	const [hashedPassword, setHashedPassword] = useState<string>("")

	const handleHashPassword = () => {
		const saltedPassword = password + salt
		const hash = CryptoJS.MD5(saltedPassword).toString()
		setHashedPassword(hash)
	}

	return (
		<Container
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: appTheme.colors.background,
				transition: "background-color 0.3s",
				padding: 0,
				margin: 0,
			}}
			maxWidth={false}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: 600,
					backgroundColor: appTheme.colors.backgroundAccent,
					padding: "48px",
					borderRadius: "8px",
					color: appTheme.colors.text,
					textAlign: "center",
					fontSize: appTheme.fontSize.bodyText,
					boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
					border: `6px solid ${appTheme.colors.secondary}`,
				}}
			>
				<Typography
					variant='h6'
					component='div'
					fontWeight='bold'
					gutterBottom
					sx={{ color: appTheme.colors.text }}
				>
					MD5 Hashing Cracking
				</Typography>

				<CLTextInput
					label='Password'
					fullWidth
					margin='normal'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					sx={{ borderRadius: "8px" }}
				/>

				<CLTextInput
					label='Salt'
					fullWidth
					margin='normal'
					value={salt}
					onChange={(e) => setSalt(e.target.value)}
					sx={{ borderRadius: "8px" }}
				/>

				<CLButton
					variant='contained'
					color='primary'
					onClick={handleHashPassword}
					sx={{ marginTop: "16px", borderRadius: "8px" }}
				>
					Hash Password
				</CLButton>

				{hashedPassword && (
					<Typography
						variant='body1'
						component='div'
						sx={{ marginTop: "16px", wordBreak: "break-all" }}
					>
						<strong>Hashed Password:</strong> {hashedPassword}
					</Typography>
				)}
			</Box>
		</Container>
	)
}
