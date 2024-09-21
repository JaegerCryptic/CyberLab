import { create } from 'zustand'

interface State {
  valid: boolean
  setInvalid: () => void
  setValid: () => void
}

export const useRefreshTokenStatus = create<State>((set) => ({
  valid: true,
  setInvalid: () => set({ valid: false }),
  setValid: () => set({ valid: true }),
}))
