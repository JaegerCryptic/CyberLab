import { Close } from '@mui/icons-material'
import { AlertColor, IconButton, Snackbar, Badge, Alert } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { create } from 'zustand'

export interface Notification {
  key?: number
  message: string
  severity: AlertColor
  duration?: number
  dismissible?: boolean
}

type NotificationStoreState = {
  notifications: Notification[]
  dispatchNotification: (notification: Notification) => void
  removeNotification: () => void
}

export const useNotificationStore = create<NotificationStoreState>((set) => ({
  notifications: [],
  dispatchNotification: (notification) => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          key: new Date().getTime() + Math.random(),
        },
      ],
    }))
  },
  removeNotification: () => {
    set((state) => ({
      notifications: state.notifications.slice(1),
    }))
  },
}))

const Notifier = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [currentNotification, setCurrentNotification] = useState<Notification>()
  const notifications = useNotificationStore((state) => state.notifications)

  const removeNotification = useNotificationStore(
    (state) => state.removeNotification
  )

  useEffect(() => {
    if (!!notifications.length && !currentNotification) {
      setCurrentNotification({ ...notifications[0] })
      setOpen(true)
    }
  }, [currentNotification, notifications])

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const handleExited = () => {
    setCurrentNotification(undefined)
    removeNotification()
  }

  const handleIconClose = useCallback(() => {
    setOpen(false)
  }, [])

  const CloseButton =
    notifications.length && currentNotification?.dismissible ? (
      <IconButton onClick={handleIconClose} size="small">
        <Close />
      </IconButton>
    ) : undefined

  const component = (
    <Snackbar
      key={currentNotification?.key}
      autoHideDuration={currentNotification?.duration || 3000}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={open}
      onClose={handleClose}
      onClick={handleIconClose}
      style={{ cursor: 'pointer' }}
      TransitionProps={{ onExited: handleExited }}
    >
      <Badge
        badgeContent={notifications.length - 1}
        showZero={false}
        color="primary"
      >
        <Alert
          color={currentNotification?.severity || 'error'}
          action={CloseButton}
          severity={currentNotification?.severity || 'error'}
        >
          {currentNotification?.message || ''}
        </Alert>
      </Badge>
    </Snackbar>
  )

  return <>{!!currentNotification && component}</>
}

export default Notifier
