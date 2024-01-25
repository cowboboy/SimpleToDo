import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { IUserData } from '../types/types'

// Define a type for the slice state
interface UserState {
  user: IUserData | null,
  isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
  isAuth: false,
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserData>) => {
        state.isAuth = true
        state.user = action.payload
    },
    logout: (state) => {
        state.isAuth = false
        state.user = null
    }
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.isAuth

export default userSlice.reducer