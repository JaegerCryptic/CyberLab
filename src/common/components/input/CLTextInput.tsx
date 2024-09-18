import { OutlinedTextFieldProps, TextField } from '@mui/material'
import { forwardRef } from 'react'

import { appTheme } from '../../../theme/style'

/**
 * The base textInput component for the CL app.
 * This is the single-line, outlined input with label.
 * All props are overrideable

 */

export interface CLTextInputProps
  extends Omit<OutlinedTextFieldProps, 'variant'> {
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  label: string
  value?: string
  endAdornment?: React.ReactNode
}
export const CLTextInput = forwardRef<
  HTMLInputElement | HTMLDivElement,
  CLTextInputProps
>((props, ref) => {
  const { label, value, onChange, endAdornment, ...rest } = props

  return (
    <TextField
      inputRef={ref}
      InputLabelProps={{
        sx: {
          color: appTheme.colors.highlight, 
          '&.Mui-focused': {
            color: appTheme.colors.selectHighlight, 
          },
          ...props.InputLabelProps?.sx,
        },
      }}
      InputProps={{
        endAdornment,
        ...rest.InputProps,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: '12px',
          },
          '&.Mui-focused fieldset': {
            borderColor: appTheme.colors.selectHighlight, 
          },
        },
      }}
      fullWidth
      label={label}
      value={value}
      onChange={(e) => onChange?.(e)}
      {...rest}
    />
  )
})
CLTextInput.displayName = 'CLTextInput'
