import { FC, useState } from 'react'
import { MainPage, Login, SignUp } from "./pages"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { initializeApp } from 'firebase/app'
import { config } from './config/config'

initializeApp(config.firebaseConfig)

export interface AppProps { }

const App: FC<AppProps> = (props) => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
