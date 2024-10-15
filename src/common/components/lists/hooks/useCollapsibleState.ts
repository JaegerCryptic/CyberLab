import { useState } from 'react'

export const useCollapsibleState = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return [isOpen, toggle] as const
}
