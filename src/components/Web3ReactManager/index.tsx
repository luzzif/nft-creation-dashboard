import { useEffect, ReactNode, ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'

import { network } from '../../connectors'
import { useTargetedChainIdFromUrl } from '../../hooks/useTargetedChainIdFromUrl'

interface Web3ReactManagerProps {
  children: ReactNode
}

export default function Web3ReactManager({ children }: Web3ReactManagerProps): ReactElement {
  const { active, activate, error } = useWeb3React()
  const targetedChainId = useTargetedChainIdFromUrl()

  useEffect(() => {
    if (!active && !error) {
      if (targetedChainId && network.supportedChainIds && network.supportedChainIds.indexOf(targetedChainId) >= 0) {
        network.changeChainId(targetedChainId)
      }
      activate(network)
    }
  }, [active, targetedChainId, error, activate])

  return <>{children}</>
}
