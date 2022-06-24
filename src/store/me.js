import { createSlice } from '@reduxjs/toolkit'

export const meSlice = createSlice({
  name: 'me',
  initialState: {
    data: null // {id, name и тд}
  },
  reducers: {
    setMe: (state, action) => {
      state.data = action.payload
    },
    clearMe: state => {
      state.data = null
    }
  }
})
// Action creators are generated for each case reducer function
export const { setMe, clearMe } = meSlice.actions

export default meSlice.reducer
