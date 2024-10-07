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

export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}
	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
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
								<ButtonBase style={{ width: "100%" }}>
									<ListItemText primary='Password Cracker' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase style={{ width: "100%" }}>
									<ListItemText primary='Phishing Simulator' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase style={{ width: "100%" }}>
									<ListItemText primary='Thing 1' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase style={{ width: "100%" }}>
									<ListItemText primary='Thing 2' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase style={{ width: "100%" }}>
									<ListItemText primary='Thing 3' />
								</ButtonBase>
							</ListItem>
							<ListItem>
								<ButtonBase style={{ width: "100%" }}>
									<ListItemText primary='Thing 4' />
								</ButtonBase>
							</ListItem>
						</List>
					</Collapse>
					<ListItem>
						<ButtonBase style={{ width: "100%" }}>
							<ListItemText primary='Menu Item 2' />
						</ButtonBase>
					</ListItem>
					<ListItem>
						<ButtonBase style={{ width: "100%" }}>
							<ListItemText primary='Menu Item 3' />
						</ButtonBase>
					</ListItem>
				</List>
			</Drawer>
		</div>
	)
}
