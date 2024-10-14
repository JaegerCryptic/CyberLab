export const generateGrid = (words: string[]): string[][] => {
  const gridSize = 10;
  const grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => "")
  );

  // Try to place words in the grid randomly (horizontal, vertical, and diagonal directions)
  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const direction = Math.floor(Math.random() * 8); // 0-7 (8 possible directions)
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        placed = true;
      }
    }
  });

  // Fill empty spaces with random letters
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === "") {
        grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
      }
    }
  }

  return grid;
};

// Check if a word can be placed in the given direction
const canPlaceWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: number
) => {
  const gridSize = grid.length;
  const dx = [0, 1, 1, 1, 0, -1, -1, -1]; // Direction modifiers for x (cols)
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1]; // Direction modifiers for y (rows)

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dy[direction];
    const newCol = col + i * dx[direction];

    if (
      newRow < 0 ||
      newRow >= gridSize ||
      newCol < 0 ||
      newCol >= gridSize ||
      (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i].toUpperCase())
    ) {
      return false;
    }
  }

  return true;
};

// Place the word in the given direction
const placeWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: number
) => {
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dy[direction];
    const newCol = col + i * dx[direction];
    grid[newRow][newCol] = word[i].toUpperCase();
  }
};

// Function to get the word being selected based on the mouse interaction
export const getSelectedWord = (
  grid: string[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
) => {
  const word = [];
  const cells: number[][] = [];
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    let currentRow = start.row;
    let currentCol = start.col;

    while (
      currentRow !== end.row + rowStep ||
      currentCol !== end.col + colStep
    ) {
      word.push(grid[currentRow][currentCol]);
      cells.push([currentRow, currentCol]);

      currentRow += rowStep;
      currentCol += colStep;
    }

    return {
      word: word.join(""),
      cells,
    };
  }

  return null; // Only straight or diagonal lines allowed
};
