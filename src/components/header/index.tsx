import { useWeb3React } from '@web3-react/core'
import { ReactElement, useCallback } from 'react'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'
import { injected } from '../../connectors'
import { ButtonMedium } from '../button'

const FlexContainer = styled(Flex)`
  border-bottom: solid 1px ${(props) => props.theme.divider};
`

export const Header = (): ReactElement => {
  const { activate, account } = useWeb3React()

  const handleClick = useCallback(() => {
    activate(injected)
  }, [activate])

  return (
    <FlexContainer width="100%" height="74px" justifyContent="space-between" alignItems="center" px="24px">
      <Text fontWeight="700">Moments dashboard</Text>
      {!!account ? account : <ButtonMedium onClick={handleClick}>Connect wallet</ButtonMedium>}
    </FlexContainer>
  )
}
