import { createTheme } from '@mui/material/styles'

const PRIMARY_COLOUR = '#7D0B02'
const ACCENT_COLOUR = '#5E0C05'
const SECONDARY_COLOUR = '#1A262A'
const SECONDARY_ACCENT_COLOUR = '#580602'
const TERTIARY_COLOUR = '#6E0703'
const TERTIARY_ACCENT_COLOUR = '#9A1D1D'
const BACKGROUND_COLOUR = '#131516'
const BACKGROUND_ACCENT_COLOUR = '#580602'
const TEXT_COLOUR = '#D8D4CF'
const TEXT_ACCENT_COLOUR = '#E8E6E3'

const appColors = {
  primary: PRIMARY_COLOUR,
  accent: ACCENT_COLOUR,
  secondary: SECONDARY_COLOUR,
  secondaryAccent: SECONDARY_ACCENT_COLOUR,
  tertiary: TERTIARY_COLOUR,
  tertiaryAccent: TERTIARY_ACCENT_COLOUR,
  background: BACKGROUND_COLOUR,
  backgroundAccent: BACKGROUND_ACCENT_COLOUR,
  text: TEXT_COLOUR,
  textAccent: TEXT_ACCENT_COLOUR,
}

const appFontSizes = {
  heading1: 24,
  heading2: 20,
  bodyText: 16,
  buttonText: 16,
  captionText: 12,
}

const appFontFamilies = {
  primary: 'Arial, sans-serif',
  secondary: 'Arial, sans-serif',
}

export const appTheme = {
  colors: appColors,
  fontSize: appFontSizes,
  fontFamily: appFontFamilies,
}

export const h1Style = {
  fontSize: appFontSizes.heading1,
  fontWeight: 700,
  fontFamily: appFontFamilies.secondary,
  color: appColors.text,
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: appTheme.colors.background,
    },
    text: {
      primary: appTheme.colors.text,
    },
    primary: {
      main: appTheme.colors.primary,
    },
    secondary: {
      main: appTheme.colors.secondary,
    },
    error: { main: '#BA1A1A' }, 
    warning: { main: '#FF9A01' }, 
    success: { main: '#3FD79C' }, 
  },
  typography: {
    fontSize: appFontSizes.bodyText,
    fontFamily: appFontFamilies.primary,
    h1: {
      fontSize: appFontSizes.heading1,
      fontWeight: 700,
      color: appTheme.colors.text,
    },
    h2: {
      fontSize: appFontSizes.heading2,
      fontWeight: 700,
      color: appTheme.colors.text,
    },
    h3: {
      fontSize: 16,
      fontWeight: 500,
      color: appTheme.colors.text,
    },
    h4: {
      fontSize: 14,
      fontWeight: 500,
      color: appTheme.colors.text,
    },
    body1: {
      fontSize: appFontSizes.bodyText,
      fontWeight: 400,
      color: appTheme.colors.text,
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      color: appTheme.colors.text,
    },
    caption: {
      fontSize: appFontSizes.captionText,
      color: '#48454E',
    },
    button: {
      fontSize: appFontSizes.buttonText,
      fontWeight: 600,
      color: appColors.textAccent,
      textTransform: 'none',
    },
  },
})