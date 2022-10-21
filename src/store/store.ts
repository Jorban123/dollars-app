import { configureStore } from '@reduxjs/toolkit'
import defaultCurReducer from './slices/defaultCurSlice'

export const store = configureStore({
  reducer: {
    defaultCur: defaultCurReducer
  },
})