'use client'

import Image from 'next/image'
import Handleform from './components/handleform'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux'
import userReducer from './userReducer';



export default function Home() {

  const store = configureStore({
    reducer: {
      users: userReducer
    }
  })

  return (
    <>
      <Provider store={store}>
        <Handleform />
      </Provider>
    </>
  )
}
