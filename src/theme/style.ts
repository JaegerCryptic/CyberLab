import { createTheme } from '@mui/material/styles'

const PRIMARY_COLOUR = '#7D0B02'
const ACCENT_COLOUR = '#5E0C05'
const SECONDARY_COLOUR = '#1A262A'
const SECONDARY_ACCENT_COLOUR = '#580602'
const TERTIARY_COLOUR = '#6E0703'
const TERTIARY_ACCENT_COLOUR = '#9A1D1D'
const BACKGROUND_COLOUR = '#121C21'
const BACKGROUND_ACCENT_COLOUR = '#580602'
const TEXT_COLOUR = '#D8D4CF'
const TEXT_ACCENT_COLOUR = '#E8E6E3'
const WHITE_COLOUR = '#FFFFFF'
const HIGHLIGHT_COLOUR = '#94B5C7'

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
  white: WHITE_COLOUR,
  highlight: HIGHLIGHT_COLOUR,
  error: '#BA1A1A', 
  warning: '#FF9A01', 
  success: '#3FD79C', 
}

const appFontSizes = {
  heading1: 24,
  heading2: 20,
  bodyText: 16,
  buttonText: 16,
  captionText: 12,
  topWebsite: 18,
  aboutSpc: 14,
  fieldAgent: 14,
  classifiedTabs: 14,
}

const appFontFamilies = {
  primary: 'Space Grotesk, sans-serif',
  secondary: 'Space Grotesk, sans-serif',
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

export const customTypography = {
  topWebsite: {
    fontSize: appFontSizes.topWebsite,
    fontWeight: 700,
    color: appTheme.colors.white,
  },
  aboutSpc: {
    fontSize: appFontSizes.aboutSpc,
    fontWeight: 500,
    color: appTheme.colors.white,
  },
  fieldAgent: {
    fontSize: appFontSizes.fieldAgent,
    fontWeight: 400,
    color: appTheme.colors.highlight,
  },
  classifiedTabs: {
    fontSize: appFontSizes.classifiedTabs,
    fontWeight: 400,
    color: appTheme.colors.white,
  },
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
    error: { main: appTheme.colors.error },
    warning: { main: appTheme.colors.warning },
    success: { main: appTheme.colors.success },
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
      fontSize: appFontSizes.captionText,
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