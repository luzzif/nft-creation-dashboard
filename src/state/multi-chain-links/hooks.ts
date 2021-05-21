import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { updateSwitchingToCorrectChain } from './actions'

export function useIsSwitchingToCorrectChain(): boolean {
  return useSelector<AppState, boolean>(state => state.multiChainLinks.switchingToCorrectChain)
}

export function useIsSwitchingToCorrectChainUpdater(): (newValue: boolean) => void {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback((newValue: boolean) => dispatch(updateSwitchingToCorrectChain(newValue)), [dispatch])
}
