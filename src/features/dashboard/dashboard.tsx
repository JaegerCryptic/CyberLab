import { TopBar } from "../../common/components/header/header"
import { useGame } from "../../routes/GameContext"
import { PasswordGame } from "./PasswordGame/PasswordGame"

export const Dashboard = () => {
	const { selectedGame } = useGame()

	return (
		<div className='dashboard'>
			<TopBar />
			<div className='dashboard-content'>
				{selectedGame ? (
					<div className='content'>
						{selectedGame === "Password Game" ? (
							<PasswordGame />
						) : (
							<h1>{selectedGame} Content</h1>
						)}
					</div>
				) : (
					<div className='content'>
						<h1>Welcome to the Dashboard</h1>
					</div>
				)}
			</div>
		</div>
	)
}
