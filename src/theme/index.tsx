import { createGlobalStyle } from 'styled-components'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'
import 'react-toastify/dist/ReactToastify.css'

const white = '#fff'
const black = '#000'

export interface Theme {
  white: string
  black: string
  divider: string
  primary: string
  shadow: string
  error: string
  success: string
  warning: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getTheme(darkMode: boolean): Theme {
  return {
    white,
    black,
    divider: '#ccc',
    primary: '#2f81ff',
    shadow: 'rgba(0, 0, 0, 0.4)',
    error: '#c62828',
    success: '#008035',
    warning: '#FF6F00',
  }
}

export const GlobalStyle = createGlobalStyle`
  html, input, textarea, button {
    font-family: 'Montserrat', sans-serif;
    font-display: fallback;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  .custom-toast-root {
      margin-top: 76px !important;
      width: auto !important;
  }

  @media (max-width: 600px) {
      .custom-toast-root {
          left: 16px !important;
          right: 16px !important;
      }
  }

  .custom-toast-container {
      box-shadow: 0px 30px 62px 0px ${(props) => props.theme.shadow} !important;
      border-radius: 16px !important;
  }

  .custom-toast-body {
      font-family: "Montserrat";
      padding: 4px 8px;
  }

  .Toastify__toast {
      min-height: auto !important;
  }

  .Toastify__toast-body {
      margin: 0 !important;
  }

  .Toastify__toast--warning {
      background: ${(props) => props.theme.warning} !important;
  }
  
  .Toastify__toast--error {
      background: ${(props) => props.theme.error} !important;
  }
  
  .Toastify__toast--success {
      background: ${(props) => props.theme.success} !important;
  }
`

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
