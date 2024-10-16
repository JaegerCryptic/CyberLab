import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  LinearProgress,
} from '@mui/material'

import { appTheme } from '../../../theme/style'
import { emailPairs } from './constants'
import { handleSelection } from './helpers'

export const PhishingSimulatorGame = () => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const totalQuestions = emailPairs.length
  const progress = ((currentPairIndex + 1) / totalQuestions) * 100

  if (currentPairIndex >= totalQuestions) {
    return (
      <Container
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
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
            backgroundColor: 'transparent',
            padding: '48px',
            borderRadius: '8px',
            color: appTheme.colors.text,
            textAlign: 'center',
            fontSize: appTheme.fontSize.bodyText,
            boxShadow: 'none',
            border: 'none',
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
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
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
          backgroundColor: 'transparent',
          padding: '48px',
          borderRadius: '8px',
          color: appTheme.colors.text,
          textAlign: 'center',
          fontSize: appTheme.fontSize.bodyText,
          boxShadow: 'none',
          border: 'none',
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
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <Typography variant='body2' component='div'>
            Step {currentPairIndex + 1} / {totalQuestions}
          </Typography>
          <Box sx={{ width: '80%' }}>
            <LinearProgress variant='determinate' value={progress} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <Paper
            sx={{
              width: '45%',
              padding: '16px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
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
          </Paper>
          <Paper
            sx={{
              width: '45%',
              padding: '16px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
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
      </Box>
    </Container>
  )
}
