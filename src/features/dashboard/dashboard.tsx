import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'

import { TopBar } from '../../common/components/header/header'
import { useGame } from '../../routes/GameContext'
import { PasswordChecker } from './PasswordGame/PasswordChecker'
import { PasswordGame } from './PasswordGame/PasswordGame'
import { Md5HashingCrackingGame } from './MD5Hash/Md5HashingCrackingGame'
import { InformationHunterGame } from './InformationHunter/InformationHunterGame'
import { GamePopup } from './GamePopup'
import { gameDescriptions } from './constants'
import { Sidebar } from '../../common/components/sidebar/sidebar'
import { PhishingSimulatorGame } from './PhisingSimulator/PhisingSimulatorGame'
import { appTheme } from '../../theme/style'
import { WordSearch } from './WordSearch/WordSearch'

export const Dashboard = () => {
  const { selectedGame } = useGame() as {
    selectedGame: keyof typeof gameDescriptions
  }
  const [popupOpen, setPopupOpen] = useState(true)
  const [previousGame, setPreviousGame] = useState<string | null>(null)

  const handleClosePopup = () => {
    setPopupOpen(false)
  }

  useEffect(() => {
    if (selectedGame && selectedGame !== previousGame) {
      setPopupOpen(true)
      setPreviousGame(selectedGame)
    }
  }, [selectedGame, previousGame])

  return (
    <div className='dashboard'>
      <TopBar />
      <Sidebar />
      <Box sx={{ padding: 2 }}>
        <div className='dashboard-content'>
          {selectedGame ? (
            <div className='content'>
              <GamePopup
                open={popupOpen}
                onClose={handleClosePopup}
                title={selectedGame}
                description={gameDescriptions[selectedGame]}
              />
              {selectedGame === 'Password Game' ? (
                <PasswordGame />
              ) : selectedGame === 'Password Checker' ? (
                <PasswordChecker />
              ) : selectedGame === 'MD5 Hashing Cracking' ? (
                <Md5HashingCrackingGame />
              ) : selectedGame === 'Information Hunter' ? (
                <InformationHunterGame />
              ) : selectedGame === 'Phishing Simulator' ? (
                <PhishingSimulatorGame />
              ) : selectedGame === 'Word Search' ? (
                <WordSearch />
              ) : (
                <Typography color={appTheme.colors.error.main} variant='h1'>
                  An error occurred. Please try again.
                </Typography>
              )}
            </div>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <Typography variant='button' color={appTheme.colors.highlight}>
                Select your module to get started.
              </Typography>
            </Box>
          )}
        </div>
      </Box>
    </div>
  )
}
