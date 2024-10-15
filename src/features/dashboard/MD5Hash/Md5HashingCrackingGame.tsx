import { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import CryptoJS from 'crypto-js'

import { appTheme } from '../../../theme/style'
import { CLTextInput } from '../../../common/components/input/CLTextInput'
import { CLButton } from '../../../common/components/buttons/CLButton'
import {
  getCharacterSetSize,
  getTimeToCrack,
  getTimeUnitAndValue,
} from '../PasswordGame/helpers'
import { timeUnits } from '../PasswordGame/constants'

export const Md5HashingCrackingGame = () => {
  const [password, setPassword] = useState<string>('')
  const [salt, setSalt] = useState<string>('')
  const [hashedPassword, setHashedPassword] = useState<string>('')
  const [timeToCrack, setTimeToCrack] = useState<string>('0 seconds')
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)

  const guessesPerSecond = 1e9

  const handleHashPassword = () => {
    if (password && salt) {
      const saltedPassword = password + salt
      const hash = CryptoJS.MD5(saltedPassword).toString()
      setHashedPassword(hash)
      calculateStrength(password)
      setIsButtonClicked(true)
    }
  }

  const calculateStrength = (password: string): void => {
    if (password.length === 0) {
      setTimeToCrack('0 seconds')
      return
    }

    const length = password.length
    const characterSetSize = getCharacterSetSize(password)
    const timeToCrackInSeconds = getTimeToCrack(
      characterSetSize,
      length,
      guessesPerSecond
    )

    if (!isFinite(timeToCrackInSeconds)) {
      setTimeToCrack('Infinity')
      return
    }

    const { selectedUnit, timeValue } = getTimeUnitAndValue(
      timeToCrackInSeconds,
      timeUnits
    )

    setTimeToCrack(`${timeValue.toFixed(2)} ${selectedUnit}`)
  }

  return (
    <Container
      sx={{
        width: '100vw',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.colors.background,
        transition: 'background-color 0.3s',
        padding: 0,
        margin: 0,
      }}
      maxWidth={false}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          backgroundColor: appTheme.colors.backgroundAccent,
          padding: '48px',
          borderRadius: '8px',
          color: appTheme.colors.text,
          textAlign: 'center',
          fontSize: appTheme.fontSize.bodyText,
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          border: `6px solid ${appTheme.colors.secondary}`,
        }}
      >
        <Typography
          variant='h6'
          component='div'
          fontWeight='bold'
          gutterBottom
          sx={{ color: appTheme.colors.text }}
        >
          MD5 Hashing Cracking
        </Typography>

        <CLTextInput
          label='Password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ borderRadius: '8px' }}
        />

        <CLTextInput
          label='Salt'
          fullWidth
          margin='normal'
          value={salt}
          onChange={(e) => setSalt(e.target.value)}
          sx={{ borderRadius: '8px' }}
        />

        <CLButton
          variant='contained'
          color='primary'
          onClick={handleHashPassword}
          sx={{ marginTop: '16px', borderRadius: '8px' }}
        >
          Hash Password
        </CLButton>

        {isButtonClicked && password && salt && (
          <>
            <Typography
              variant='body1'
              component='div'
              sx={{ marginTop: '16px', wordBreak: 'break-all' }}
            >
              <strong>Hashed Password:</strong> {hashedPassword}
            </Typography>

            <Typography
              variant='body1'
              component='div'
              sx={{ marginTop: '16px', wordBreak: 'break-all' }}
            >
              <strong>Time to Crack:</strong> {timeToCrack}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  )
}
