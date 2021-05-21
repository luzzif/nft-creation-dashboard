import { ReactElement, Suspense, useMemo } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Web3ReactManager from '../../components/Web3ReactManager'
import { SkeletonTheme } from 'react-loading-skeleton'
import { getTheme, GlobalStyle } from '../../theme'
import { useIsDarkMode } from '../../state/user/hooks'
import { Header } from '../../components/header'
import { Redirect, Route, Switch } from 'react-router-dom'
import { New } from '../new'
import { Flex } from 'rebass'
import { ToastContainer, Slide } from 'react-toastify'

const Content = styled(Flex)`
  padding: 16px 24px;
`

export function App(): ReactElement {
  const darkMode = useIsDarkMode()
  const theme = useMemo(() => getTheme(darkMode), [darkMode])

  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SkeletonTheme color={theme.white} highlightColor={theme.black}>
          <Web3ReactManager>
            <ToastContainer
              className="custom-toast-root"
              toastClassName="custom-toast-container"
              bodyClassName="custom-toast-body"
              position="top-right"
              closeButton={false}
              transition={Slide}
            />
            <Header />
            <Content justifyContent="center">
              <Switch>
                <Route strict exact path="/new" component={New} />
                <Redirect to="/new" />
              </Switch>
            </Content>
          </Web3ReactManager>
        </SkeletonTheme>
      </ThemeProvider>
    </Suspense>
  )
}
