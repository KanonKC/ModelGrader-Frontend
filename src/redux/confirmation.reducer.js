import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: "Are you sure do you want to proceed?",
  isOpen: false,
  onConfirm: null, //() => { }
}

export const confimationSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    openComfirmation: (state, data) => {
      const { payload } = data
      state.isOpen = true
      state.message = payload.message ? payload.message : "Are you sure do you want to proceed?"
      state.onConfirm = payload.onConfirm
      state.args = payload.args
    },
    closeConfirmation: (state) => {
      state.isOpen = false
    },
    acceptConfirmation: (state) => {
      state.onConfirm()
      state.isOpen = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { openComfirmation, closeConfirmation, acceptConfirmation } = confimationSlice.actions

export default confimationSlice.reducer