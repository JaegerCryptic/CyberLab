import { getAccessToken } from './tokens'

export const debuggerURI = (port: number) => `http://localhost:${port}`

export const getApiUrl = (env?: 'localhost' | 'dev') => {
  const environment =
    localStorage.getItem('securecore-env') || import.meta.env.VITE_ENVIRONMENT
  if (environment === 'localhost' || env === 'localhost') {
    return debuggerURI(8080)
  }

  const location = document.location.href
  if (location.includes('dev') || location.includes('localhost')) {
    return 'https://dev.sc.cl.io'
  }

  if (location.includes('stage')) {
    return 'https://stage.sc.cl.io'
  }

  // Default to prod in future
  return 'https://prod.sc.cl.io'
}

export const getSocketUrl = () => {
  const token = getAccessToken()
  const environment = localStorage.getItem('galactose-env')
  if (environment === 'localhost') {
    return 'wss://localhost:8080'
  }

  const location = document.location.href
  if (location.includes('dev') || location.includes('localhost')) {
    return `wss://dev.websocket.cl.io/ws/${token}`
  }

  if (location.includes('stage')) {
    return `wss://stage.websocket.cl.io/ws/${token}`
  }

  // Default to prod in future
  return `wss://websocket.cl.io/ws/${token}`
}