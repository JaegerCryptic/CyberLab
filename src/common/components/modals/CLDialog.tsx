import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    alpha,
    DialogProps,
    DialogContentText,
  } from '@mui/material'
  import { ReactNode } from 'react'
  
  import { appTheme } from '../../../theme/style'
  import { CLTooltip } from '../tooltips/CLTooltip'
  
  export interface CLDialogProps extends Omit<DialogProps, 'open' | 'title'> {
    title: ReactNode
    body: ReactNode
    actions?: ReactNode
    titleTooltip?: string
  }
  
  export const CLDialog = ({
    title,
    body,
    actions,
    titleTooltip,
    ...props
  }: CLDialogProps) => {
    return (
      <Dialog
        disableRestoreFocus
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: alpha(appTheme.colors.secondary, 0.4),
            },
          },
        }}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 6,
          },
          '& .MuiDialog-container': {
            marginTop: 10,
            alignItems: 'flex-start',
          },
          pb: 6,
        }}
        {...props}
        open={true}
      >
        {titleTooltip ? (
          <CLTooltip title={titleTooltip}>
            <DialogTitle
              style={{
                fontSize: '24px',
                fontWeight: 400,
                paddingBottom: 0,
              }}
            >
              {title}
            </DialogTitle>
          </CLTooltip>
        ) : (
          <DialogTitle
            style={{
              fontSize: '24px',
              fontWeight: 400,
            }}
          >
            {title}
          </DialogTitle>
        )}
        <DialogContent style={{ paddingTop: titleTooltip ? 16 : 0 }}>
          {typeof body === 'string' ? (
            <DialogContentText>{body}</DialogContentText>
          ) : (
            body
          )}
        </DialogContent>
        {actions && (
          <DialogActions
            sx={{
              '&.MuiDialogActions-root': {
                padding: '0 20px 20px',
              },
            }}
          >
            {actions}
          </DialogActions>
        )}
      </Dialog>
    )
  }
  