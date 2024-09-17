import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'


export const Copyright = (): JSX.Element => (
  <Grid container spacing={0}>
    <Grid xs={12} justifyContent={'center'}>
      <Box display={'flex'} justifyContent={'center'} gap={1}>
        <Typography align="center" noWrap>
          Copyright ©
        </Typography>
        <Typography>{new Date().getFullYear()}</Typography>
      </Box>
    </Grid>
    <Grid xs={12} justifyContent={'center'}>
      <Box display={'flex'} justifyContent={'center'} gap={1}>
      </Box>
    </Grid>
  </Grid>
)
