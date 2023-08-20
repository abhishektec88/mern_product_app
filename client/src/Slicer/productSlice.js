import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'productApi',
  initialState: {
    product: [],
    total: 0
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setTotal: (state, action) => {
      state.total = action.payload
    }
  }
})

export const { setProduct, setTotal } = productSlice.actions

export default productSlice.reducer