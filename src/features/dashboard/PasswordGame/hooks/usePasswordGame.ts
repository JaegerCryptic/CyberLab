import { useState, useCallback, useRef } from 'react'
import { addBombsToPassword, explodePassword } from '../helpers'
import { initialRules, checkRules } from '../constants'

export const usePasswordGame = () => {
	const [password, setPassword] = useState<string>('')
	const [rules, setRules] = useState(initialRules)
	const [hasStartedTyping, setHasStartedTyping] = useState(false)
	const [bombTimer, setBombTimer] = useState<number | null>(null)
	const [bombsAdded, setBombsAdded] = useState(false)
	const [allBombsRemoved, setAllBombsRemoved] = useState(false)
	const [bombsExploded, setBombsExploded] = useState(false)
	const [explosionOccurred, setExplosionOccurred] = useState(false)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [showFailMessage, setShowFailMessage] = useState(false)
	const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false)
	const [successMessageShown, setSuccessMessageShown] = useState(false)

	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const resetGame = useCallback(() => {
		setPassword('')
		setRules(initialRules)
		setHasStartedTyping(false)
		setBombTimer(null)
		setBombsAdded(false)
		setAllBombsRemoved(false)
		setBombsExploded(false)
		setExplosionOccurred(false)
		setShowSuccessMessage(false)
		setShowFailMessage(false)
		setIsCongratsModalOpen(false)
		setSuccessMessageShown(false)
		if (timerRef.current) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
	}, [])

	const startBombTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}
		timerRef.current = setInterval(() => {
			setBombTimer((prev) => {
				if (prev !== null && prev > 0) {
					return prev - 1
				} else {
					if (prev === 0) {
						setPassword((prevPassword) => explodePassword(prevPassword))
						setBombsExploded(true)
						setExplosionOccurred(true)
						setShowFailMessage(true)
						setTimeout(() => setShowFailMessage(false), 5000)
						clearInterval(timerRef.current!)
						timerRef.current = null
					}
					return null
				}
			})
		}, 1000)
	}, [])

	const addBombs = useCallback(() => {
		if (rules[31].met && !bombsAdded) {
			const newPassword = addBombsToPassword(password, 15)
			setPassword(newPassword)
			setBombTimer(10)
			setBombsAdded(true)

			const updatedRules = checkRules(newPassword, rules)
			setRules(updatedRules)

			startBombTimer()
		}
	}, [rules, bombsAdded, password, startBombTimer])

	const handlePasswordChange = (newPassword: string): void => {
		try {
			if (!bombsExploded || explosionOccurred) {
				setPassword(newPassword)

				if (!hasStartedTyping && newPassword.length > 0) {
					setHasStartedTyping(true)
				}

				if (
					bombsAdded &&
					!newPassword.includes('💣') &&
					!bombsExploded &&
					!successMessageShown
				) {
					setAllBombsRemoved(true)
					setBombTimer(null)
					setShowSuccessMessage(true)
					setSuccessMessageShown(true)
					setTimeout(() => setShowSuccessMessage(false), 5000)
					if (timerRef.current) {
						clearInterval(timerRef.current)
						timerRef.current = null
					}
				}

				const updatedRules = checkRules(newPassword, rules)
				setRules(updatedRules)

				const allMet = updatedRules.every((rule) => rule.met)
				if (allMet) {
					setIsCongratsModalOpen(true)
				}

				addBombs()
			}
		} catch (error) {
			console.error('Error handling password change:', error)
		}
	}

	return {
		password,
		rules,
		hasStartedTyping,
		bombTimer,
		allBombsRemoved,
		showSuccessMessage,
		showFailMessage,
		isCongratsModalOpen,
		handlePasswordChange,
		resetGame,
		setIsCongratsModalOpen,
	}
}
