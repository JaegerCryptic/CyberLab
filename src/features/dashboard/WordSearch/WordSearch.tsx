import { useEffect, useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { appTheme } from "../../../theme/style";
import { generateGrid, getSelectedWord } from "./helpers/wordSearchHelper";

// Word List and Definitions
const wordList = [
  { word: "firewall", description: "A network security device that monitors and filters incoming and outgoing network traffic." },
  { word: "encryption", description: "The process of encoding information to protect it from unauthorised access." },
  { word: "malware", description: "Software intentionally designed to cause damage to a computer, server, or network." },
  { word: "virus", description: "A type of malicious software that spreads by infecting other programs or files." },
  { word: "password", description: "A secret word or phrase used to authenticate access to a system." },
  { word: "phishing", description: "The fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity." },
  { word: "hacker", description: "A person who uses computers to gain unauthorised access to data." },
  { word: "ransomware", description: "Malicious software that locks a computer until a ransom is paid." },
  { word: "antivirus", description: "Software designed to detect and destroy computer viruses." },
  { word: "breach", description: "An incident in which data, applications, networks, or devices are accessed without authorisation." },
  { word: "spyware", description: "Software that secretly records information about your activities on your computer." },
  { word: "keylogger", description: "A malicious program that records every keystroke made on a computer." },
  { word: "worm", description: "A type of malware that spreads copies of itself from computer to computer." },
  { word: "adware", description: "Software that automatically displays or downloads advertising material." },
  { word: "botnet", description: "A network of private computers infected with malicious software and controlled as a group." },
  { word: "rootkit", description: "Software designed to grant unauthorised access to a computer." },
  { word: "backdoor", description: "A method used by hackers to bypass normal authentication to secure unauthorised remote access to a system." },
  { word: "firefox", description: "A popular web browser known for its security features." },
  { word: "tor", description: "A software enabling anonymous communication and privacy on the internet." },
  { word: "hash", description: "A function that converts an input into a fixed-length string of characters." },
  { word: "proxy", description: "An intermediary server separating end users from the websites they browse." },
  { word: "trojan", description: "A type of malware disguised as legitimate software." },
  { word: "ddos", description: "A type of cyberattack where multiple systems flood the bandwidth or resources of a targeted system." },
  { word: "spoofing", description: "A type of attack where a person or program successfully masquerades as another." },
  { word: "honeypot", description: "A security system set up to attract and trap intruders or attackers." },
];

// Pre-defined word groups for each level (5 groups of 5 words each)
const wordGroups = [
  ["firewall", "encryption", "malware", "virus", "password"],
  ["phishing", "hacker", "ransomware", "antivirus", "breach"],
  ["spyware", "keylogger", "worm", "adware", "botnet"],
  ["rootkit", "backdoor", "firefox", "tor", "hash"],
  ["proxy", "trojan", "ddos", "spoofing", "honeypot"],
];

// Modal styling
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: appTheme.colors.backgroundAccent,
  border: `2px solid ${appTheme.colors.secondary}`,
  boxShadow: 24,
  p: 4,
  color: appTheme.colors.text,
};

export const WordSearch = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<{ word: string; cells: number[][] }[]>([]);
  const [wordToFind, setWordToFind] = useState<{ word: string, description: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [level, setLevel] = useState(1); // Level counter
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false); // Modal for level completion
  const [, setHighlightedCells] = useState<number[][]>([]); // Track highlighted cells for placed words

  const maxLevel = 5; // Total levels

  // Mouse interaction states
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(null);
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);

  useEffect(() => {
    loadNewLevel();
  }, [level]);

  const loadNewLevel = () => {
    if (level > maxLevel) {
      return; // Ensure we don't go past the maximum level
    }

    // Randomly select a word group for the current level
    const selectedGroup = wordGroups[level - 1];

    // Generate the grid with the selected word group
    const { grid: generatedGrid, wordCells } = generateGrid(selectedGroup, true); // True for more overlap
    setGrid(generatedGrid);
    setHighlightedCells(wordCells); // Store the placed word positions for highlighting
    setSelectedWords(selectedGroup); // Set the selected group as the words to find
    setFoundWords([]); // Reset found words for the new level
  };

  const handleWordFound = (word: string, cells: number[][]) => {
    setFoundWords((prev) => [...prev, { word, cells }]);
    const wordDetails = wordList.find((w) => w.word === word);
    if (wordDetails) {
      setWordToFind({ word: wordDetails.word, description: wordDetails.description });
      setIsModalOpen(true);
    }
  };

  const handleCloseWordModal = () => {
    setIsModalOpen(false);
    if (foundWords.length === selectedWords.length) {
      setIsCongratsModalOpen(true); // Open the congratulatory modal for completing the level
    }
  };

  const handleNextLevelOrRestart = () => {
    setIsCongratsModalOpen(false);
    if (level < maxLevel) {
      setLevel((prev) => prev + 1);
    } else {
      setLevel(1); // Reset to level 1 when finished
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    setStartPos({ row, col });
    setSelectedCells([[row, col]]);
  };

  const handleMouseOver = (row: number, col: number) => {
    if (isMouseDown && startPos) {
      setSelectedCells((prev) => [...prev, [row, col]]);
    }
  };

  const handleMouseUp = (row: number, col: number) => {
    if (startPos) {
      const { word, cells } = getSelectedWord(grid, startPos, { row, col }) || { word: "", cells: [] };

      if (selectedWords.includes(word.toLowerCase())) {
        handleWordFound(word.toLowerCase(), cells);
      }
    }
    setIsMouseDown(false);
    setSelectedCells([]);
  };

  // Keep the cells highlighted green once a word is found
  const isCellFound = (row: number, col: number) => {
    return foundWords.some((found) =>
      found.cells.some(([r, c]) => r === row && c === col)
    );
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: appTheme.colors.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none", // Prevents text selection
        position: "relative", // Allows independent positioning of level and grid
      }}
    >
      {/* Level Counter */}
      <Box
        sx={{
          position: "absolute",
          mt: "-105px",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h5" sx={{ color: appTheme.colors.text, fontSize: "32px" }}>
          Level {level}
        </Typography>
      </Box>

      {/* Main content: Word Search Grid and Word List */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "-50px",
          ml: "225px",
        }}
      >
        {/* Word Search Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(10, 1fr)`,
            gap: 1,
            mr: "30px",
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                sx={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid white",
                  backgroundColor: isCellSelected(rowIndex, colIndex)
                    ? appTheme.colors.success.main // Use the original green for selected words
                    : isCellFound(rowIndex, colIndex)
                    ? appTheme.colors.success.main // Keep the green background for found words
                    : appTheme.colors.backgroundAccent,
                  color: isCellSelected(rowIndex, colIndex) || isCellFound(rowIndex, colIndex) ? "#2A2A2A" : appTheme.colors.text,
                  fontSize: "24px",
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
        <Box sx={{ ml: "48px" }}>
          <Typography variant="h6" sx={{ color: appTheme.colors.text, fontSize: "24px" }}>
            Words to Find:
          </Typography>
          {selectedWords.map((word, index) => (
            <Typography
              key={index}
              sx={{
                textDecoration: foundWords.some((found) => found.word === word) ? "line-through" : "none",
                color: foundWords.some((found) => found.word === word) ? appTheme.colors.success.main : appTheme.colors.text,
                mt: 1,
                fontSize: "24px",
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
          <Typography variant="h6" sx={{ fontSize: "24px" }}>{wordToFind?.word}</Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "18px" }}>{wordToFind?.description}</Typography>
          <Button onClick={handleCloseWordModal} sx={{ mt: 2, backgroundColor: appTheme.colors.success.main }}>
            Continue
          </Button>
        </Box>
      </Modal>

      {/* Modal for Level Completion */}
      <Modal open={isCongratsModalOpen} onClose={handleNextLevelOrRestart}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ fontSize: "24px" }}>
            {level < maxLevel
              ? `Congratulations! You've completed Level ${level}.`
              : "Congratulations! You've completed the Word Search Challenge!"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "18px" }}>
            {level < maxLevel ? "Ready for the next challenge?" : "Want to restart the challenge?"}
          </Typography>
          <Button onClick={handleNextLevelOrRestart} sx={{ mt: 2, backgroundColor: appTheme.colors.success.main }}>
            {level < maxLevel ? "Next Level" : "Restart"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
