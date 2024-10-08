import { useCookies } from "react-cookie"

import { useCookies } from "react-cookie"

import { TopBar } from "../../common/components/header/header"
import { useGame } from "../../routes/GameContext"
import { PasswordChecker } from "./PasswordGame/PasswordChecker"
import { PasswordGame } from "./PasswordGame/PasswordGame"
import { Md5HashingCrackingGame } from "./MD5Hash/Md5HashingCrackingGame"
import { InformationHunterGame } from "./InformationHunter/InformationHunterGame"

export const Dashboard = () => {
	const { selectedGame } = useGame()
	const [cookies] = useCookies(["userName"])
	const [cookies] = useCookies(["userName"])

	return (
		<div className='dashboard'>
			<TopBar />
			<div className='dashboard-content'>
				{selectedGame ? (
					<div className='content'>
						{selectedGame === "Password Game" ? (
							<PasswordGame />
						) : selectedGame === "Password Checker" ? (
						) : selectedGame === "Password Checker" ? (
							<PasswordChecker />
						) : selectedGame === "MD5 Hashing Cracking" ? (
							<Md5HashingCrackingGame />
						) : selectedGame === "Information Hunter" ? (
							<InformationHunterGame />
						) : (
							<h1>{selectedGame} Content</h1>
						)}
					</div>
				) : (
					<div className='content'>
						<h1>Welcome {cookies.userName}</h1>
					</div>
				)}
			</div>
		</div>
	)
}
