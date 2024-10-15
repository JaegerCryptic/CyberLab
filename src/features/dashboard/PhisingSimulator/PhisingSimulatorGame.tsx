import { useState } from 'react'
import { Box, Container, Typography, Button, Paper } from '@mui/material'

import { appTheme } from '../../../theme/style'
import { emailPairs } from './constants'
import { handleSelection } from './helpers'

export const PhishingSimulatorGame = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

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
          <Paper sx={{ width: '45%', padding: '16px', textAlign: 'left' }}>
            <Typography variant='subtitle2' component='div' gutterBottom>
              From: {currentPair.legitimate.sender}
            </Typography>
            <Typography variant='subtitle2' component='div' gutterBottom>
              Subject: {currentPair.legitimate.subject}
            </Typography>
            <Typography variant='subtitle2' component='div' gutterBottom>
              Date: {currentPair.legitimate.timestamp}
            </Typography>
            <Typography variant='body1' component='div' gutterBottom>
              {currentPair.legitimate.body}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() =>
                handleSelection(
                  false,
                  currentPairIndex,
                  setScore,
                  setFeedback,
                  setCurrentPairIndex
                )
              }
            >
              Legitimate
            </Button>
          </Paper>
          <Paper sx={{ width: '45%', padding: '16px', textAlign: 'left' }}>
            <Typography variant='subtitle2' component='div' gutterBottom>
              From: {currentPair.phishing.sender}
            </Typography>
            <Typography variant='subtitle2' component='div' gutterBottom>
              Subject: {currentPair.phishing.subject}
            </Typography>
            <Typography variant='subtitle2' component='div' gutterBottom>
              Date: {currentPair.phishing.timestamp}
            </Typography>
            <Typography variant='body1' component='div' gutterBottom>
              {currentPair.phishing.body}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() =>
                handleSelection(
                  true,
                  currentPairIndex,
                  setScore,
                  setFeedback,
                  setCurrentPairIndex
                )
              }
            >
              Phishing
            </Button>
          </Paper>
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
