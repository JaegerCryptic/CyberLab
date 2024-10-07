import { TopBar } from "../../common/components/header/header"
import { useGame } from "../context/GameContext"

export const Dashboard = () => {
	const { selectedGame } = useGame()

	return (
		<div className='dashboard'>
			<TopBar />
			<div className='dashboard-content'>
				{selectedGame ? (
					<div className='content'>
						<h1>{selectedGame} Content</h1>
						{/* Insert the rest of the game content here */}
					</div>
				) : (
					<div className='content'>
						<h1>Welcome to the Dashboard</h1>
						{/* Insert default content here */}
					</div>
				)}
			</div>
		</div>
	)
}
