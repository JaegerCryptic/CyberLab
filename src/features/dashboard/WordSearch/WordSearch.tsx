import { Box, Typography, Modal, Button } from '@mui/material'

import { appTheme, modalStyle } from '../../../theme/style'
import { useWordSearch } from './hooks/useWordSearch'
import { maxLevel } from './constants'

export const WordSearch = () => {
  const {
    grid,
    selectedWords,
    foundWords,
    wordToFind,
    isModalOpen,
    level,
    isCongratsModalOpen,
    handleCloseWordModal,
    handleNextLevelOrRestart,
    handleMouseDown,
    handleMouseOver,
    handleMouseUp,
    isCellFound,
    isCellSelected,
  } = useWordSearch()

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: appTheme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none', // Prevents text selection
        position: 'relative', // Allows independent positioning of level and grid
      }}
    >
      {/* Level Counter */}
      <Box
        sx={{
          position: 'absolute',
          mt: '-105px',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Typography
          variant='h5'
          sx={{ color: appTheme.colors.text, fontSize: '32px' }}
        >
          Level {level}
        </Typography>
      </Box>

      {/* Main content: Word Search Grid and Word List */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '-50px',
          ml: '225px',
        }}
      >
        {/* Word Search Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(10, 1fr)`,
            gap: 1,
            mr: '30px',
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                sx={{
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid white',
                  backgroundColor: isCellSelected(rowIndex, colIndex)
                    ? appTheme.colors.success.main // Use the original green for selected words
                    : isCellFound(rowIndex, colIndex)
                    ? appTheme.colors.success.main // Keep the green background for found words
                    : appTheme.colors.backgroundAccent,
                  color:
                    isCellSelected(rowIndex, colIndex) ||
                    isCellFound(rowIndex, colIndex)
                      ? '#2A2A2A'
                      : appTheme.colors.text,
                  fontSize: '24px',
                }}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                onMouseUp={() => handleMouseUp(rowIndex, colIndex)}
              >
                {letter}
              </Box>
            ))
          )}
        </Box>

        {/* Word List */}
        <Box sx={{ ml: '48px' }}>
          <Typography
            variant='h6'
            sx={{ color: appTheme.colors.text, fontSize: '24px' }}
          >
            Words to Find:
          </Typography>
          {selectedWords.map((word, index) => (
            <Typography
              key={index}
              sx={{
                textDecoration: foundWords.some((found) => found.word === word)
                  ? 'line-through'
                  : 'none',
                color: foundWords.some((found) => found.word === word)
                  ? appTheme.colors.success.main
                  : appTheme.colors.text,
                mt: 1,
                fontSize: '24px',
              }}
            >
              {word}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Modal for Word Descriptions */}
      <Modal open={isModalOpen} onClose={handleCloseWordModal}>
        <Box sx={modalStyle}>
          <Typography variant='h6' sx={{ fontSize: '24px' }}>
            {wordToFind?.word}
          </Typography>
          <Typography variant='body1' sx={{ mt: 2, fontSize: '18px' }}>
            {wordToFind?.description}
          </Typography>
          <Button
            onClick={handleCloseWordModal}
            sx={{ mt: 2, backgroundColor: appTheme.colors.success.main }}
          >
            Continue
          </Button>
        </Box>
      </Modal>

      {/* Modal for Level Completion */}
      <Modal open={isCongratsModalOpen} onClose={handleNextLevelOrRestart}>
        <Box sx={modalStyle}>
          <Typography variant='h6' sx={{ fontSize: '24px' }}>
            {level < maxLevel
              ? `Congratulations! You've completed Level ${level}.`
              : "Congratulations! You've completed the Word Search Challenge!"}
          </Typography>
          <Typography variant='body1' sx={{ mt: 2, fontSize: '18px' }}>
            {level < maxLevel
              ? 'Ready for the next challenge?'
              : 'Want to restart the challenge?'}
          </Typography>
          <Button
            onClick={handleNextLevelOrRestart}
            sx={{ mt: 2, backgroundColor: appTheme.colors.success.main }}
          >
            {level < maxLevel ? 'Next Level' : 'Restart'}
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}
