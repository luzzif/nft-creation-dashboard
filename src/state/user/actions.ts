import { createAction } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: BigNumber
  symbol: string
  name: string
}

export const updateDarkMode = createAction<boolean>('user/updateUserDarkMode')

export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')

export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
