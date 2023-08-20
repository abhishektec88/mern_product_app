import { configureStore } from '@reduxjs/toolkit'
import productSlice from './Slicer/productSlice'

export const store = configureStore({
  reducer: {
    productApi: productSlice
  },
})