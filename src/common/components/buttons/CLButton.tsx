import { Button, ButtonProps, CircularProgress, styled } from '@mui/material'

import { CLTooltip } from '../tooltips/CLTooltip'

const StyledButton = styled(Button)({
  cursor: 'pointer',
  borderRadius: 100,
})

export interface FWButtonProps extends ButtonProps {
  isLoading?: boolean
  tooltipWhenDisabled?: string
}

export const FWButton = (props: FWButtonProps) => {
  const {
    children,
    color = 'primary',
    isLoading,
    fullWidth = false,
    variant = 'contained',
    disabled,
    tooltipWhenDisabled,
    ...rest
  } = props

  const Component = (
    <StyledButton
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      endIcon={
        props.endIcon || isLoading ? <CircularProgress size={20} /> : null
      }
      {...rest}
    >
      {children}
    </StyledButton>
  )

  return tooltipWhenDisabled && disabled ? (
    <CLTooltip title={tooltipWhenDisabled}>
      <span>{Component}</span>
    </CLTooltip>
  ) : (
    Component
  )
}
