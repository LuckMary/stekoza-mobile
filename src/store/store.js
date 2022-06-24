import { configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import me from './me'

export default configureStore({
  reducer: {
    counter,
    me
  }
})
