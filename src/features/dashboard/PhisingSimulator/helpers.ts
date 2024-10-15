import { emailPairs } from './constants'

export const handleSelection = (
  isPhishing: boolean,
  currentPairIndex: number,
  setScore: (updateScore: (prevScore: number) => number) => void,
  setFeedback: (feedback: string | null) => void,
  setCurrentPairIndex: (index: number) => void
) => {
  const currentPair = emailPairs[currentPairIndex]
  const isCorrect = isPhishing ? currentPair.phishing : currentPair.legitimate

  if (isCorrect) {
    setScore((prevScore: number) => prevScore + 1)
    setFeedback(`Correct! ${currentPair.reason}`)
  } else {
    setFeedback(`Incorrect. ${currentPair.reason}`)
  }

  setTimeout(() => {
    setFeedback(null)
    setCurrentPairIndex(currentPairIndex + 1)
  }, 3000)
}
