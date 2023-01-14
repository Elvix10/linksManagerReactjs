import { configureStore } from '@reduxjs/toolkit'
import link from './slice/link'

export const store = configureStore({
  reducer: {
    link:link
    
  },
})