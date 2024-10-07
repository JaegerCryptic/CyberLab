import { TopBar } from "../../common/components/header/header"
import { useGame } from "../../routes/GameContext"
import { PasswordChecker } from "./PasswordGame/PasswordChecker"
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
						) : selectedGame === "Password Checker" ? ( // Add condition for Password Checker
							<PasswordChecker />
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
