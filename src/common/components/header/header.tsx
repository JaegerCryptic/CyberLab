import { useState } from "react"
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem,
} from "@mui/material"

export const TopBar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' sx={{ flexGrow: 1 }}>
					Dashboard
				</Typography>
				<Button color='inherit' onClick={handleClick}>
					SCP Foundation
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>SCP Foundation 1</MenuItem>
					<MenuItem onClick={handleClose}>SCP Foundation 2</MenuItem>
					<MenuItem onClick={handleClose}>SCP Foundation 3</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	)
}
