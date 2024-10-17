import { useState, useEffect } from 'react'

import { maxLevel, wordGroups, wordList } from '../constants'
import { generateGrid, getSelectedWord } from '../helpers'

export const useWordSearch = () => {
  const [grid, setGrid] = useState<string[][]>([])
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [foundWords, setFoundWords] = useState<
    { word: string; cells: number[][] }[]
  >([])
  const [wordToFind, setWordToFind] = useState<{
    word: string
    description: string
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [level, setLevel] = useState(1) // Level counter
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false) // Modal for level completion
  const [, setHighlightedCells] = useState<number[][]>([]) // Track highlighted cells for placed words

  // Mouse interaction states
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(
    null
  )
  const [selectedCells, setSelectedCells] = useState<number[][]>([])

  useEffect(() => {
    loadNewLevel()
  }, [level])

  const loadNewLevel = () => {
    if (level > maxLevel) {
      return // Ensure we don't go past the maximum level
    }

    // Randomly select a word group for the current level
    const selectedGroup = wordGroups[level - 1]

    // Generate the grid with the selected word group
    const { grid: generatedGrid, wordCells } = generateGrid(selectedGroup, true) // True for more overlap
    setGrid(generatedGrid)
    setHighlightedCells(wordCells) // Store the placed word positions for highlighting
    setSelectedWords(selectedGroup) // Set the selected group as the words to find
    setFoundWords([]) // Reset found words for the new level
  }

  const handleWordFound = (word: string, cells: number[][]) => {
    setFoundWords((prev) => [...prev, { word, cells }])
    const wordDetails = wordList.find((w) => w.word === word)
    if (wordDetails) {
      setWordToFind({
        word: wordDetails.word,
        description: wordDetails.description,
      })
      setIsModalOpen(true)
    }
  }

  const handleCloseWordModal = () => {
    setIsModalOpen(false)
    if (foundWords.length === selectedWords.length) {
      setIsCongratsModalOpen(true) // Open the congratulatory modal for completing the level
    }
  }

  const handleNextLevelOrRestart = () => {
    setIsCongratsModalOpen(false)
    if (level < maxLevel) {
      setLevel((prev) => prev + 1)
    } else {
      setLevel(1) // Reset to level 1 when finished
    }
  }

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true)
    setStartPos({ row, col })
    setSelectedCells([[row, col]])
  }

  const handleMouseOver = (row: number, col: number) => {
    if (isMouseDown && startPos) {
      setSelectedCells((prev) => [...prev, [row, col]])
    }
  }

  const handleMouseUp = (row: number, col: number) => {
    if (startPos) {
      const { word, cells } = getSelectedWord(grid, startPos, { row, col }) || {
        word: '',
        cells: [],
      }

      if (selectedWords.includes(word.toLowerCase())) {
        handleWordFound(word.toLowerCase(), cells)
      }
    }
    setIsMouseDown(false)
    setSelectedCells([])
  }

  // Keep the cells highlighted green once a word is found
  const isCellFound = (row: number, col: number) => {
    return foundWords.some((found) =>
      found.cells.some(([r, c]) => r === row && c === col)
    )
  }

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(([r, c]) => r === row && c === col)
  }

  return {
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
  }
}
