import { useState } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'

import { appTheme } from '../../../theme/style'

const emailPairs = [
  {
    legitimate:
      'Dear user, your account has been updated successfully. If you did not make this change, please contact support.',
    phishing:
      'Dear user, your account has been compromised. Click here to reset your password immediately.',
    reason:
      'The phishing email creates a sense of urgency and asks you to click a link.',
  },
  {
    legitimate:
      'Your package has been shipped and will arrive in 3-5 business days. Track your package here.',
    phishing:
      'Your package delivery failed. Click here to reschedule delivery.',
    reason:
      'The phishing email uses a fake delivery failure to get you to click a link.',
  },
  // Add more email pairs with increasing difficulty
]

export const PhishingSimulatorGame = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSelection = (isPhishing: boolean) => {
    const currentPair = emailPairs[currentPairIndex]
    const isCorrect = isPhishing ? currentPair.phishing : currentPair.legitimate

    if (isCorrect) {
      setScore(score + 1)
      setFeedback(`Correct! ${currentPair.reason}`)
    } else {
      setFeedback(`Incorrect. ${currentPair.reason}`)
    }

    setTimeout(() => {
      setFeedback(null)
      setCurrentPairIndex(currentPairIndex + 1)
    }, 3000)
  }

  if (currentPairIndex >= emailPairs.length) {
    return (
      <Container
        sx={{
          width: '100vw',
          height: '100vh',
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
            maxWidth: 1000,
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
            Phishing Simulator
          </Typography>
          <Typography variant='body1' component='div' gutterBottom>
            Game Over! Your score: {score}
          </Typography>
        </Box>
      </Container>
    )
  }

  const currentPair = emailPairs[currentPairIndex]

  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
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
          maxWidth: 1000,
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
          Phishing Simulator
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <Box sx={{ width: '45%', textAlign: 'left' }}>
            <Typography variant='body1' component='div' gutterBottom>
              {currentPair.legitimate}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleSelection(false)}
            >
              Legitimate
            </Button>
          </Box>
          <Box sx={{ width: '45%', textAlign: 'left' }}>
            <Typography variant='body1' component='div' gutterBottom>
              {currentPair.phishing}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleSelection(true)}
            >
              Phishing
            </Button>
          </Box>
        </Box>

        {feedback && (
          <Typography
            variant='body1'
            component='div'
            gutterBottom
            sx={{ color: appTheme.colors.error.dark }}
          >
            {feedback}
          </Typography>
        )}

        <Typography variant='body1' component='div' gutterBottom>
          Score: {score}
        </Typography>
      </Box>
    </Container>
  )
}
