import { useState } from 'react'
import { List, Box } from '@mui/material'

import { useGame } from '../../../routes/GameContext'
import { appTheme } from '../../../theme/style'
import { CLCollapsibleListItem } from '../CLCollapsibleListItem'

export const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPasswordCheckerOpen, setIsPasswordCheckerOpen] = useState(false)
  const { setSelectedGame } = useGame()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const togglePasswordChecker = () => {
    setIsPasswordCheckerOpen(!isPasswordCheckerOpen)
  }

  const handleGameClick = (game: string) => {
    setSelectedGame(game)
  }

  const HEADERHEIGHT = '65px'

  return (
    <Box
      mt={HEADERHEIGHT}
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: appTheme.colors.background,
        boxShadow: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1200,
      }}
    >
      <List>
        <CLCollapsibleListItem
          text='Classified Material'
          isOpen={isDropdownOpen}
          onClick={toggleDropdown}
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
          <CLCollapsibleListItem
            text='Phishing Simulator'
            isOpen={false}
            onClick={() => handleGameClick('Phishing Simulator')}
            isCollapsible={false}
          />
          <CLCollapsibleListItem
            text='MD5 Hashing'
            isOpen={false}
            onClick={() => handleGameClick('MD5 Hashing Cracking')}
            isCollapsible={false}
          />
          <CLCollapsibleListItem
            text='Information Hunting'
            isOpen={false}
            onClick={() => handleGameClick('Information Hunter')}
            isCollapsible={false}
          />
        </CLCollapsibleListItem>
      </List>
    </Box>
  )
}
