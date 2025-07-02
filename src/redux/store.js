import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterslice.jsx'
import userReducer from '../features/user/userSlice.jsx'


export const store = configureStore({
  reducer: {
     users: userReducer, 
     counter: counterReducer,
  },
})