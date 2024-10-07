import { createContext, useState, useContext, ReactNode } from "react"

interface GameContextType {
	selectedGame: string
	setSelectedGame: (game: string) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = (children: ReactNode) => {
	const [selectedGame, setSelectedGame] = useState<string>("")

	return (
		<GameContext.Provider value={{ selectedGame, setSelectedGame }}>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => {
	const context = useContext(GameContext)
	if (!context) {
		throw new Error("useGame must be used within a GameProvider")
	}
	return context
}
