import { useState } from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Menu,
	Box,
	Tooltip,
	ClickAwayListener,
} from '@mui/material'

import { appTheme } from '../../../theme/style'
import SCPLogo from '../../../images/scp_logo.png'
import SCPLogoAlt from '../../../images/scp_logo_alt.png'
import { useGame } from '../../../routes/GameContext'

export const TopBar = () => {
	const [anchorEl] = useState<null | HTMLElement>(null)
	const [tooltipOpen, setTooltipOpen] = useState(false)
	const { setSelectedGame } = useGame()

	const handleClick = () => {
		setSelectedGame('About SCP Foundation')
	}

	const handleClose = () => {
		setTooltipOpen(false)
	}

	const handleClickAway = () => {
		setTooltipOpen(false)
	}

	return (
		<AppBar
			position='static'
			sx={{
				boxShadow: 'none',
				borderBottom: '1px solid #F5F5DC',
				backgroundColor: appTheme.colors.background,
				backgroundImage: 'inherit',
			}}
		>
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
					<img src={SCPLogo} style={{ marginRight: 0, height: '20px' }} />
					<Typography color={'white'} variant='h3'>
						SCP Foundation
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ClickAwayListener onClickAway={handleClickAway}>
						<Tooltip
							title='Learn more about the SCP Foundation'
							open={tooltipOpen}
							onClose={handleClose}
							disableHoverListener
							disableFocusListener
						>
							<Button color='inherit' onClick={handleClick}>
								About SCP Foundation
							</Button>
						</Tooltip>
					</ClickAwayListener>
					<img
						src={SCPLogoAlt}
						style={{ marginLeft: '8px', height: '50px', width: '100px' }}
					/>
				</Box>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				/>
			</Toolbar>
		</AppBar>
	)
}
