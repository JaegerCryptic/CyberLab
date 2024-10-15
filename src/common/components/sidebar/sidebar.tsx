import { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  IconButton,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

import { useGame } from '../../../routes/GameContext'
import { appTheme } from '../../../theme/style'

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
        <ListItem
          button
          onClick={toggleDropdown}
          sx={{
            '&:hover': {
              backgroundColor: appTheme.colors.secondary,
            },
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <IconButton>
            {isDropdownOpen ? (
              <ExpandLess sx={{ color: appTheme.colors.text }} />
            ) : (
              <ExpandMore sx={{ color: appTheme.colors.text }} />
            )}
          </IconButton>
          <ListItemText primary='Classified Material' />
        </ListItem>
        <Collapse in={isDropdownOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem
              button
              onClick={togglePasswordChecker}
              sx={{
                '&:hover': {
                  backgroundColor: appTheme.colors.secondary,
                },
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <IconButton>
                {isPasswordCheckerOpen ? (
                  <ExpandLess sx={{ color: appTheme.colors.text }} />
                ) : (
                  <ExpandMore sx={{ color: appTheme.colors.text }} />
                )}
              </IconButton>
              <ListItemText primary='Password Activities' />
            </ListItem>
            <Collapse in={isPasswordCheckerOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem
                  button
                  onClick={() => handleGameClick('Password Game')}
                  sx={{
                    '&:hover': {
                      backgroundColor: appTheme.colors.secondary,
                    },
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  <ListItemText primary='Password Game' />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleGameClick('Password Checker')}
                  sx={{
                    '&:hover': {
                      backgroundColor: appTheme.colors.secondary,
                    },
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                >
                  <ListItemText primary='Password Checker' />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleGameClick('Phishing Simulator')}
              sx={{
                '&:hover': {
                  backgroundColor: appTheme.colors.secondary,
                },
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <ListItemText primary='Phishing Simulator' />
            </ListItem>
            <ListItem
              button
              onClick={() => handleGameClick('MD5 Hashing Cracking')}
              sx={{
                '&:hover': {
                  backgroundColor: appTheme.colors.secondary,
                },
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <ListItemText primary='MD5 Hashing' />
            </ListItem>
            <ListItem
              button
              onClick={() => handleGameClick('Information Hunter')}
              sx={{
                '&:hover': {
                  backgroundColor: appTheme.colors.secondary,
                },
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <ListItemText primary='Information Hunting' />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  )
}
