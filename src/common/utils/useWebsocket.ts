import { useEffect, useState } from 'react'

import { getSocketUrl } from './urls'

enum SocketStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  ERROR = 'error',
}

export const useWebsocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [socketStatus, setSocketStatus] = useState<SocketStatus>(
    SocketStatus.CLOSED
  )

  useEffect(() => {
    const socket = new WebSocket(getSocketUrl())
    setSocket(socket)

    socket.onopen = () => {
      setSocketStatus(SocketStatus.OPEN)
    }

    socket.onclose = () => {
      setSocketStatus(SocketStatus.CLOSED)
    }

    socket.onerror = () => {
      setSocketStatus(SocketStatus.ERROR)
    }

    return () => {
      socket.close()
    }
  }, [])

  return { socket, socketStatus }
}
