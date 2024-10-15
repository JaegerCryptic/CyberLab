import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Typography } from '@mui/material'

import { TopBar } from '../../common/components/header/header'
import { useGame } from '../../routes/GameContext'
import { PasswordChecker } from './PasswordGame/PasswordChecker'
import { PasswordGame } from './PasswordGame/PasswordGame'
import { Md5HashingCrackingGame } from './MD5Hash/Md5HashingCrackingGame'
import { InformationHunterGame } from './InformationHunter/InformationHunterGame'
import { GamePopup } from './GamePopup'
import { PhishingSimulatorGame } from './PhisingSimulator/PhisingSimulatorGame'
import { gameDescriptions } from './constants'

export const Dashboard = () => {
  const { selectedGame } = useGame() as {
    selectedGame: keyof typeof gameDescriptions
  }
  const [cookies] = useCookies(['userName'])
  const [popupOpen, setPopupOpen] = useState(true)

  const handleClosePopup = () => {
    setPopupOpen(false)
  }

  return (
    <div className='dashboard'>
      <TopBar />
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
            ) : (
              <h1>{selectedGame} Content</h1>
            )}
          </div>
        ) : (
          <Typography variant='h1'>Welcome {cookies.userName}</Typography>
        )}
      </div>
    </div>
  )
}
