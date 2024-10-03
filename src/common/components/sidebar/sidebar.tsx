import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons"

// sidebar time
export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	// collapsable sidebar for the game selection options
	return (
		<div className={`sidebar ${isOpen ? "open" : ""}`}>
			<div className='burger' onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faBars} />
			</div>
			<nav>
				<ul>
					<li onClick={toggleDropdown}>
						<span>Classified Material</span>
						<FontAwesomeIcon icon={faChevronDown} />
					</li>
					{isDropdownOpen && (
						<ul className='dropdown'>
							<li>Password Cracker</li>
							<li>Phishing Simulator</li>
							<li>Thing 1</li>
							<li>Thing 2</li>
							<li>Thing 3</li>
							<li>Thing 4</li>
						</ul>
					)}
					<li>Menu Item 2</li>
					<li>Menu Item 3</li>
				</ul>
			</nav>
		</div>
	)
}
