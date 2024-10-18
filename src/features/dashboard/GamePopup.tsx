import { Box, Typography, Button, Modal } from '@mui/material'
import { appTheme } from '../../theme/style'

interface GamePopupProps {
	open: boolean
	onClose: () => void
	title: string
	description: string
}

export const GamePopup = ({
	open,
	onClose,
	title,
	description,
}: GamePopupProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography variant='h6' component='h2' color={appTheme.colors.text}>
					{title}
				</Typography>
				<Typography sx={{ mt: 2 }}>{description}</Typography>
				<Button onClick={onClose} variant='contained' sx={{ mt: 2 }}>
					Got it!
				</Button>
			</Box>
		</Modal>
	)
}
