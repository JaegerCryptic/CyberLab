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
	const [isPasswordCheckerOpen, setIsPasswordCheckerOpen] = useState(false)
	const { setSelectedGame } = useGame()

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const togglePasswordChecker = () => {
		setIsPasswordCheckerOpen(!isPasswordCheckerOpen)
	}

	const handleGameClick = (game: string) => {
		setSelectedGame(game)
		setIsOpen(false)
	}

	return (
		<>
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
									onClick={togglePasswordChecker}
								>
									<ListItemText primary='Password Checker' />
									{isPasswordCheckerOpen ? <ExpandLess /> : <ExpandMore />}
								</ButtonBase>
							</ListItem>
							<Collapse in={isPasswordCheckerOpen} timeout='auto' unmountOnExit>
								<List component='div' disablePadding>
									<ListItem>
										<ButtonBase
											style={{ width: "100%" }}
											onClick={() => handleGameClick("Password Game")}
										>
											<ListItemText primary='Password Game' />
										</ButtonBase>
									</ListItem>
									<ListItem>
										<ButtonBase
											style={{ width: "100%" }}
											onClick={() => handleGameClick("Password Checker")}
										>
											<ListItemText primary='Password Checker' />
										</ButtonBase>
									</ListItem>
								</List>
							</Collapse>
							<ListItem>
								<ButtonBase
									style={{ width: "100%" }}
									onClick={() => handleGameClick("Phishing Simulator")}
								>
									<ListItemText primary='Phishing Simulator' />
								</ButtonBase>
							</ListItem>
						</List>
					</Collapse>
				</List>
			</Drawer>
		</>
	)
}
