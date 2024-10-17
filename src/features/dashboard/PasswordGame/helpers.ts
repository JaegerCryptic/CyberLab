export const getCharacterSetSize = (password: string): number => {
  let size = 0
  if (/[a-z]/.test(password)) size += 26
  if (/[A-Z]/.test(password)) size += 26
  if (/\d/.test(password)) size += 10
  if (/[\W_]/.test(password)) size += 32
  return size
}

export const getTimeToCrack = (
  characterSetSize: number,
  length: number,
  guessesPerSecond: number = 1e9
): number => {
  const totalGuesses = Math.pow(characterSetSize, length)
  return totalGuesses / guessesPerSecond
}

export const getTimeUnitAndValue = (
  timeInSeconds: number,
  timeUnits: { unit: string; value: number }[]
) => {
  let selectedUnit = 'seconds'
  let timeValue = timeInSeconds

  for (let i = 0; i < timeUnits.length; i++) {
    if (timeInSeconds < timeUnits[i].value) break
    selectedUnit = timeUnits[i].unit
    timeValue = timeInSeconds / timeUnits[i].value
  }

  return { selectedUnit, timeValue }
}

export const getBackgroundColor = (
  selectedUnit: string,
  timeValue: number
): string => {
  if (
    (selectedUnit === 'weeks' && timeValue >= 1) ||
    selectedUnit.includes('months') ||
    selectedUnit.includes('years')
  ) {
    return 'green'
  } else {
    return 'red'
  }
}

export const addBombsToPassword = (password: string, numberOfBombs: number) => {
  const bombEmoji = '💣'
  let updatedPassword = [...password]
  let insertCount = 0
  const positions = new Set<number>()

  const isValidPosition = (char: string, pos: number) => {
    const before = password[pos - 1] || ''
    const after = password[pos + 1] || ''
    return (
      /[a-zA-Z0-9]/.test(char) &&
      !/[💣()🐔]/.test(before) &&
      !/[💣()🐔]/.test(after)
    )
  }

  while (insertCount < numberOfBombs) {
    const randomPosition = Math.floor(Math.random() * updatedPassword.length)

    if (
      !positions.has(randomPosition) &&
      isValidPosition(updatedPassword[randomPosition], randomPosition)
    ) {
      positions.add(randomPosition)
      updatedPassword.splice(randomPosition + insertCount, 0, bombEmoji)
      insertCount++
    }
  }

  return updatedPassword.join('')
}

export const explodePassword = (password: string): string => {
  return '💥💥💥'.repeat(Math.floor(password.length / 3)) // Replace password with explosions
}

export const getActualLength = (password: string): number => {
  // Spread operator converts emojis and special characters into single units
  return [...password].length
}
