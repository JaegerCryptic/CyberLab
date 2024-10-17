import { List, Box, Typography } from '@mui/material'
import { useCookies } from 'react-cookie'

import { useGame } from '../../../routes/GameContext'
import { appTheme } from '../../../theme/style'
import { CLCollapsibleListItem } from '../lists/CLCollapsibleListItem'
import SCPLogo from '../../../images/scp_logo.png'
import { useCollapsibleState } from '../lists/hooks/useCollapsibleState'

export const Sidebar = () => {
	const [isDropdownOpen1D9F, toggleDropdown1D9F] = useCollapsibleState()
	const [isDropdownOpen2T7M, toggleDropdown2T7M] = useCollapsibleState()
	const [isDropdownOpen3F5O, toggleDropdown3F5O] = useCollapsibleState()
	const [isDropdownOpen4U9Z, toggleDropdown4U9Z] = useCollapsibleState()

	const [isPasswordCheckerOpen, togglePasswordChecker] = useCollapsibleState()

	const { setSelectedGame } = useGame()

	const handleGameClick = (game: string) => {
		setSelectedGame(game)
	}

	const HEADERHEIGHT = '65px'
	const [cookies] = useCookies(['userName'])

	return (
		<Box
			mt={HEADERHEIGHT}
			sx={{
				width: 310,
				height: '100vh',
				backgroundColor: appTheme.colors.background,
				boxShadow: 0,
				position: 'fixed',
				top: 0,
				left: 20,
				zIndex: 1200,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mt: 2 }}>
				<img src={SCPLogo} style={{ marginRight: 0, height: '65px' }} />
				<Typography variant='button' color={appTheme.colors.highlight}>
					Welcome agent {cookies.userName} to the SCP Foundation Field agent
					Training modules
				</Typography>
			</Box>
			<List>
				<CLCollapsibleListItem
					text='Classified 1D-9F'
					isOpen={isDropdownOpen1D9F}
					onClick={toggleDropdown1D9F}
				>
					<CLCollapsibleListItem
						text='Password Activities'
						isOpen={isPasswordCheckerOpen}
						onClick={togglePasswordChecker}
					>
						<CLCollapsibleListItem
							text='Password Game'
							isOpen={false}
							onClick={() => handleGameClick('Password Game')}
							isCollapsible={false}
						/>
						<CLCollapsibleListItem
							text='Password Checker'
							isOpen={false}
							onClick={() => handleGameClick('Password Checker')}
							isCollapsible={false}
						/>
					</CLCollapsibleListItem>
				</CLCollapsibleListItem>

				<CLCollapsibleListItem
					text='Classified 2T-7M'
					isOpen={isDropdownOpen2T7M}
					onClick={toggleDropdown2T7M}
				>
					<CLCollapsibleListItem
						text='Phishing Simulator'
						isOpen={false}
						onClick={() => handleGameClick('Phishing Simulator')}
						isCollapsible={false}
					/>
				</CLCollapsibleListItem>

				<CLCollapsibleListItem
					text='Classified 3F-5O'
					isOpen={isDropdownOpen3F5O}
					onClick={toggleDropdown3F5O}
				>
					<CLCollapsibleListItem
						text='MD5 Hashing'
						isOpen={false}
						onClick={() => handleGameClick('MD5 Hashing Cracking')}
						isCollapsible={false}
					/>
				</CLCollapsibleListItem>

				<CLCollapsibleListItem
					text='Classified 4U-9Z'
					isOpen={isDropdownOpen4U9Z}
					onClick={toggleDropdown4U9Z}
				>
					<CLCollapsibleListItem
						text='Information Hunting'
						isOpen={false}
						onClick={() => handleGameClick('Information Hunter')}
						isCollapsible={false}
					/>
					<CLCollapsibleListItem
						text='Word Search'
						isOpen={false}
						onClick={() => handleGameClick('Word Search')}
						isCollapsible={false}
					/>
				</CLCollapsibleListItem>
			</List>
		</Box>
	)
}
