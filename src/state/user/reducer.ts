import { createReducer } from '@reduxjs/toolkit'
import { addSerializedToken, removeSerializedToken, SerializedToken, updateDarkMode } from './actions'

export interface UserState {
  darkMode: boolean
  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }
}

export const initialState: UserState = {
  darkMode: true,
  tokens: {}
}

export const userReducer = createReducer(initialState, builder =>
  builder
    .addCase(updateDarkMode, (state, action) => {
      state.darkMode = action.payload
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
    })
)
