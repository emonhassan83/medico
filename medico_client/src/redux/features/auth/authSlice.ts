import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
    user: null,
    loading : false,
    error: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     userPandding : (state) => {
        state.loading=true
     },
     userSuccess : (state, action) => {
        state.loading =false
        state.user = action.payload
     },
     userFailed : (state, action) => {
        state.loading = false
        state.error = action.payload
     } 
  },
})


// Action creators are generated for each case reducer function
export const {  } = authSlice.actions;

export default authSlice.reducer;