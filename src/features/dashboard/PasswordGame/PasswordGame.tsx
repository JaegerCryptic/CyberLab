import { Box, Typography, Modal, Button } from '@mui/material'

import { appTheme, modalStyle } from '../../../theme/style'
import { usePasswordGame } from './hooks/usePasswordGame'
import RuleList from './components/PasswordRuleList'
import { PasswordInput } from './components/PasswordInput'

export const PasswordGame = () => {
	const {
		password,
		rules,
		hasStartedTyping,
		bombTimer,
		allBombsRemoved,
		showSuccessMessage,
		showFailMessage,
		isCongratsModalOpen,
		handlePasswordChange,
		setIsCongratsModalOpen,
	} = usePasswordGame()

	const PADDING = '32px'

	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				backgroundColor: appTheme.colors.background,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: PADDING,
				overflowY: 'auto',
			}}
		>
			<Typography
				variant='h1'
				sx={{ mb: '32px', mt: '160px', color: appTheme.colors.text }}
				textAlign='center'
			>
				The Password Game
			</Typography>

			{!allBombsRemoved && bombTimer !== null && bombTimer > 0 && (
				<Typography variant='h6' sx={{ color: appTheme.colors.error.main }}>
					Bombs are about to explode in {bombTimer} seconds!
				</Typography>
			)}

			{showSuccessMessage && (
				<Typography variant='h6' sx={{ color: appTheme.colors.success.main }}>
					You saved Paul by deleting all the bombs! 🎉
				</Typography>
			)}

			{showFailMessage && (
				<Typography variant='h6' sx={{ color: appTheme.colors.error.main }}>
					You failed to save Paul. The bombs exploded! 💥💥💥
				</Typography>
			)}

			<Modal
				open={isCongratsModalOpen}
				onClose={() => setIsCongratsModalOpen(false)}
			>
				<Box sx={modalStyle}>
					<Typography variant='h6'>Congratulations! 🎉</Typography>
					<Typography variant='body1' sx={{ mt: 2 }}>
						You have now built the ultimate password! Try testing it in the
						Password Checker and see how strong it is!
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
					width: '100%',
					maxWidth: 780,
					backgroundColor: appTheme.colors.backgroundAccent,
					padding: '48px',
					borderRadius: '8px',
					color: appTheme.colors.text,
					textAlign: 'center',
					fontSize: appTheme.fontSize.bodyText,
					boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
					border: `6px solid ${appTheme.colors.secondary}`,
					marginRight: '20px',
				}}
			>
				<PasswordInput password={password} setPassword={handlePasswordChange} />
			</Box>

			<Box
				sx={{
					width: '75%',
					maxWidth: '800px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					mt: PADDING,
				}}
			>
				{hasStartedTyping && <RuleList rules={rules} />}
			</Box>
		</Box>
	)
}
