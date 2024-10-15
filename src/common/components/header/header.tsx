import { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Menu, Box } from '@mui/material'

import { appTheme } from '../../../theme/style'
import SCPLogo from '../../../images/scp_logo.png'

export const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position='static'
      sx={{
        boxShadow: 'none',
        borderBottom: '1px solid #F5F5DC',
        backgroundColor: appTheme.colors.background,
        backgroundImage: 'inherit',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={SCPLogo} style={{ marginRight: 0, height: '20px' }} />
          <Typography variant='inherit'>SCP Foundation</Typography>
        </Box>
        <Button color='inherit' onClick={handleClick}>
          About SCP Foundation
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        />
      </Toolbar>
    </AppBar>
  )
}
