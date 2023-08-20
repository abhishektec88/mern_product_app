import { createSlice } from '@reduxjs/toolkit'
import { GetUserInfoByToken } from '../utils/GetUserInfoByToken';

const initialState = {
  auth: 0,
}

export const authSlice = createSlice({
  name: 'authValue',
  initialState,
  reducers: {
    setAuth: (state, action) => {
        GetUserInfoByToken(action.payload)
    //   localStorage.setItem('token', JSON.stringify(action.payload));
    //   console.log('action.payload', action.payload)
    },
    getAuth: (state, action) => {
        state.auth = localStorage.getItem('token');
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, getAuth } = authSlice.actions

export default authSlice.reducer