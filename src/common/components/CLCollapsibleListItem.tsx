import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  ListItemButton,
  IconButton,
  ListItemText,
  Collapse,
  List,
} from '@mui/material'

import { appTheme } from '../../theme/style'

export const CLCollapsibleListItem = ({
  text,
  isOpen,
  onClick,
  children,
  isCollapsible = true,
}: {
  text: string
  isOpen: boolean
  onClick: () => void
  children?: React.ReactNode
  isCollapsible?: boolean
}) => (
  <>
    <ListItemButton
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: appTheme.colors.secondary,
        },
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      {isCollapsible && (
        <IconButton>
          {isOpen ? (
            <ExpandLess sx={{ color: appTheme.colors.text }} />
          ) : (
            <ExpandMore sx={{ color: appTheme.colors.text }} />
          )}
        </IconButton>
      )}
      <ListItemText primary={text} />
    </ListItemButton>
    {isCollapsible && (
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {children}
        </List>
      </Collapse>
    )}
  </>
)
