import { useState, useEffect } from "react"
import {
	Box,
	Container,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Paper,
} from "@mui/material"

import { appTheme } from "../../../theme/style"
import { CLTextInput } from "../../../common/components/input/CLTextInput"
import { files, hints } from "./constants"

export const InformationHunterGame = () => {
	const [gameStarted, setGameStarted] = useState(false)
	const [timeLeft, setTimeLeft] = useState(60) // 60 seconds timer
	const [currentHint, setCurrentHint] = useState("")
	const [searchQuery, setSearchQuery] = useState("")
	const [foundInfo, setFoundInfo] = useState<string | null>(null)
	const [gameWon, setGameWon] = useState(false)
	const [winningFile, setWinningFile] = useState<{
		name: string
		content: string
	} | null>(null)
	const [selectedFile, setSelectedFile] = useState<{
		name: string
		content: string
	} | null>(null)

	useEffect(() => {
		if (gameStarted && timeLeft > 0) {
			const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
			return () => clearTimeout(timer)
		} else if (timeLeft === 0) {
			setGameStarted(false)
		}
	}, [gameStarted, timeLeft])

	const startGame = () => {
		setGameStarted(true)
		setTimeLeft(60)
		setCurrentHint(hints[Math.floor(Math.random() * hints.length)])
		setFoundInfo(null)
		setGameWon(false)
		setWinningFile(null)
		setSelectedFile(null)
	}

	const checkInformation = () => {
		if (searchQuery.length < 3) {
			setFoundInfo("Search query must be at least 3 characters long.")
			return
		}
		const file = files.find((file) => file.content.includes(searchQuery))
		if (file) {
			setFoundInfo(`Found in ${file.name}: ${file.content}`)
			setGameWon(true)
			setGameStarted(false)
			setWinningFile(file)
		} else {
			setFoundInfo("Information not found. Try again.")
		}
	}

	const filteredFiles = files.filter(
		(file) =>
			file.name.includes(searchQuery) || file.content.includes(searchQuery)
	)

	return (
		<Container
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: appTheme.colors.background,
				transition: "background-color 0.3s",
				padding: 0,
				margin: 0,
			}}
			maxWidth={false}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: 800,
					backgroundColor: appTheme.colors.backgroundAccent,
					padding: "48px",
					borderRadius: "8px",
					color: appTheme.colors.text,
					textAlign: "center",
					fontSize: appTheme.fontSize.bodyText,
					boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
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
					Information Hunter
				</Typography>

				{!gameStarted && !gameWon ? (
					<Button variant='contained' color='primary' onClick={startGame}>
						Start Game
					</Button>
				) : gameWon ? (
					<>
						<Typography
							variant='body1'
							component='div'
							sx={{ marginTop: "16px" }}
						>
							Congratulations! You found the information.
						</Typography>
						{winningFile && (
							<Typography
								variant='body1'
								component='div'
								sx={{ marginTop: "16px", wordBreak: "break-all" }}
							>
								<strong>File Name:</strong> {winningFile.name}
								<br />
								<strong>File Content:</strong> {winningFile.content}
							</Typography>
						)}
						<Button variant='contained' color='primary' onClick={startGame}>
							Play Again
						</Button>
					</>
				) : (
					<>
						<Typography
							variant='body1'
							component='div'
							sx={{ marginTop: "16px" }}
						>
							Time Left: {timeLeft} seconds
						</Typography>
						<Typography
							variant='body1'
							component='div'
							sx={{ marginTop: "16px" }}
						>
							Hint: {currentHint}
						</Typography>
						<CLTextInput
							label='Search Query'
							fullWidth
							margin='normal'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							sx={{ borderRadius: "8px" }}
						/>
						<List
							sx={{
								maxHeight: 200,
								overflow: "auto",
								backgroundColor: appTheme.colors.secondary,
								marginTop: "16px",
								borderRadius: "8px",
							}}
						>
							{filteredFiles.map((file) => (
								<ListItem
									key={file.name}
									button
									onClick={() => setSelectedFile(file)}
								>
									<ListItemText primary={file.name} />
								</ListItem>
							))}
						</List>
						{selectedFile && (
							<Paper
								sx={{
									marginTop: "16px",
									padding: "16px",
									backgroundColor: appTheme.colors.secondary,
									borderRadius: "8px",
									textAlign: "left",
									maxHeight: 200,
									overflow: "auto",
								}}
							>
								<Typography variant='body1' component='div'>
									<strong>{selectedFile.name}</strong>
								</Typography>
								<Typography variant='body2' component='div'>
									{selectedFile.content}
								</Typography>
							</Paper>
						)}
						<Button
							variant='contained'
							color='primary'
							fullWidth
							sx={{ marginTop: "16px" }}
							onClick={checkInformation}
						>
							Search
						</Button>
						{foundInfo && (
							<Typography
								variant='body1'
								component='div'
								sx={{ marginTop: "16px", wordBreak: "break-all" }}
							>
								{foundInfo}
							</Typography>
						)}
					</>
				)}
			</Box>
		</Container>
	)
}
