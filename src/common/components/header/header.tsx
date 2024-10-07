import { useState } from "react"
import { AppBar, Toolbar, Typography, Button, Menu } from "@mui/material"
import { Sidebar } from "../sidebar/sidebar"

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
				<Sidebar />
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
				/>
			</Toolbar>
		</AppBar>
	)
}
