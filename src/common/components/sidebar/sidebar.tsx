import { useState } from 'react'
import {
  List,
  ListItemText,
  Collapse,
  Box,
  IconButton,
  ListItemButton,
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
        <ListItemButton
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
        </ListItemButton>
        <Collapse in={isDropdownOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton
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
            </ListItemButton>
            <Collapse in={isPasswordCheckerOpen} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton
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
                </ListItemButton>
                <ListItemButton
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
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
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
            </ListItemButton>
            <ListItemButton
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
            </ListItemButton>
            <ListItemButton
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
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  )
}
