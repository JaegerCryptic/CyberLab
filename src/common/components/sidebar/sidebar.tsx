import { useState } from "react"
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Collapse,
	ButtonBase,
} from "@mui/material"
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material"

import { useGame } from "../../../routes/GameContext"

export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const { setSelectedGame } = useGame()

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const handleGameClick = (game: string) => {
		setSelectedGame(game)
		setIsOpen(false) // Close the sidebar after selecting a game
	}

	return (
		<div>
			<IconButton onClick={toggleSidebar}>
				<MenuIcon />
			</IconButton>
			<Drawer anchor='left' open={isOpen} onClose={toggleSidebar}>
				<List>
					<ListItem>
						<ButtonBase onClick={toggleDropdown} style={{ width: "100%" }}>
							<ListItemText primary='Classified Material' />
							{isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
						</ButtonBase>
					</ListItem>
					<Collapse in={isDropdownOpen} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Password Cracker")}
								>
									<ListItemText primary='Password Cracker' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Phishing Simulator")}
								>
									<ListItemText primary='Phishing Simulator' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Thing 1")}
								>
									<ListItemText primary='Thing 1' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Thing 2")}
								>
									<ListItemText primary='Thing 2' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Thing 3")}
								>
									<ListItemText primary='Thing 3' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Thing 4")}
								>
									<ListItemText primary='Thing 4' />
								</ButtonBase>
							</ListItem>
						</List>
					</Collapse>
					<ListItem>
						<ButtonBase
							style={{ width: "100%" }}
							onClick={() => handleGameClick("Menu Item 2")}
						>
							<ListItemText primary='Menu Item 2' />
						</ButtonBase>
					</ListItem>
					<ListItem>
						<ButtonBase
							style={{ width: "100%" }}
							onClick={() => handleGameClick("Menu Item 3")}
						>
							<ListItemText primary='Menu Item 3' />
						</ButtonBase>
					</ListItem>
				</List>
			</Drawer>
		</div>
	)
}
