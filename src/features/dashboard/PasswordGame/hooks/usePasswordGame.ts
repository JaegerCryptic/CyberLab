import { useState, useEffect } from 'react'
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

	const resetGame = () => {
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
	}

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
				}

				const updatedRules = checkRules(newPassword, rules)
				setRules(updatedRules)

				const allMet = updatedRules.every((rule) => rule.met)
				if (allMet) {
					setIsCongratsModalOpen(true)
				}
			}
		} catch (error) {
			console.error('Error handling password change:', error)
		}
	}

	useEffect(() => {
		try {
			if (rules[31].met && !bombsAdded) {
				const newPassword = addBombsToPassword(password, 15)
				setPassword(newPassword)
				setBombTimer(10)
				setBombsAdded(true)

				const updatedRules = checkRules(newPassword, rules)
				setRules(updatedRules)
			}
		} catch (error) {
			console.error('Error adding bombs to password:', error)
		}
	}, [rules, bombsAdded, password])

	useEffect(() => {
		try {
			if (bombTimer !== null && bombTimer > 0 && !allBombsRemoved) {
				const timer = setTimeout(() => {
					setBombTimer(bombTimer - 1)
				}, 1000)

				return () => clearTimeout(timer)
			}

			if (bombTimer === 0 && !explosionOccurred) {
				setPassword(explodePassword(password))
				setBombsExploded(true)
				setExplosionOccurred(true)
				setShowFailMessage(true)
				setTimeout(() => setShowFailMessage(false), 5000)
			}
		} catch (error) {
			console.error('Error handling bomb timer:', error)
		}
	}, [bombTimer, password, allBombsRemoved, explosionOccurred])

	useEffect(() => {
		return () => {
			resetGame()
		}
	}, [])

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
