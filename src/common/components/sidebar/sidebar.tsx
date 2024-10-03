import { useState } from "react"
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Collapse,
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	return (
		<div>
			<IconButton onClick={toggleSidebar}></IconButton>
			<Drawer anchor='left' open={isOpen} onClose={toggleSidebar}>
				<List>
					<ListItem button onClick={toggleDropdown}>
						<ListItemText primary='Classified Material' />
						{isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={isDropdownOpen} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							<ListItem button>
								<ListItemText primary='Password Cracker' />
							</ListItem>
							<ListItem button>
								<ListItemText primary='Phishing Simulator' />
							</ListItem>
							<ListItem button>
								<ListItemText primary='Thing 1' />
							</ListItem>
							<ListItem button>
								<ListItemText primary='Thing 2' />
							</ListItem>
							<ListItem button>
								<ListItemText primary='Thing 3' />
							</ListItem>
							<ListItem button>
								<ListItemText primary='Thing 4' />
							</ListItem>
						</List>
					</Collapse>
					<ListItem button>
						<ListItemText primary='Menu Item 2' />
					</ListItem>
					<ListItem button>
						<ListItemText primary='Menu Item 3' />
					</ListItem>
				</List>
			</Drawer>
		</div>
	)
}
