import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import { appTheme } from '../../../theme/style'

export const UserWorkspaceRoutesWrapper = () => {
  return (
    <Box
      overflow={'hidden'}
      height={'100vh'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: appTheme.colors.background,
      }}
    >
      <Outlet />
    </Box>
  )
}
