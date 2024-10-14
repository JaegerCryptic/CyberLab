export const getCharacterSetSize = (password: string): number => {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/\d/.test(password)) size += 10;
  if (/[\W_]/.test(password)) size += 32;
  return size;
};

export const getTimeToCrack = (
  characterSetSize: number,
  length: number,
  guessesPerSecond: number = 1e9
): number => {
  const totalGuesses = Math.pow(characterSetSize, length);
  return totalGuesses / guessesPerSecond;
};

export const getTimeUnitAndValue = (
  timeInSeconds: number,
  timeUnits: { unit: string; value: number }[]
) => {
  let selectedUnit = "seconds";
  let timeValue = timeInSeconds;

  for (let i = 0; i < timeUnits.length; i++) {
    if (timeInSeconds < timeUnits[i].value) break;
    selectedUnit = timeUnits[i].unit;
    timeValue = timeInSeconds / timeUnits[i].value;
  }

  return { selectedUnit, timeValue };
};

export const getBackgroundColor = (
  selectedUnit: string,
  timeValue: number
): string => {
  if (
    (selectedUnit === "weeks" && timeValue >= 1) ||
    selectedUnit.includes("months") ||
    selectedUnit.includes("years")
  ) {
    return "green";
  } else {
    return "red";
  }
};

export const addBombsToPassword = (password: string): string => {
  const bombEmoji = "💣";
  let newPassword = password;

  // Add 15 bombs at random positions throughout the password
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * newPassword.length);
    newPassword =
      newPassword.slice(0, randomIndex) + bombEmoji + newPassword.slice(randomIndex);
  }

  return newPassword;
};

export const explodePassword = (password: string): string => {
  return "💥💥💥".repeat(Math.floor(password.length / 3)); // Replace password with explosions
};



