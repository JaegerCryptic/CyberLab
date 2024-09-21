import { styled, TooltipProps, Tooltip, tooltipClasses } from '@mui/material'

import { appTheme } from '../../../theme/style'

export const CLTooltip = styled(
  ({
    className,
    ...props
  }: TooltipProps & {
    maxWidth?: number
  }) => <Tooltip {...props} classes={{ popper: className }} />
)(({ maxWidth }: { maxWidth?: number }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: appTheme.colors.backgroundAccent,
    textAlign: 'center',
    padding: 6,
    margin: '0 !important',
    maxWidth: maxWidth || 200,
  },
}))
