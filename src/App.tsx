import { FC } from 'react'
import { MainPage, Login, SignUp, User, Movie } from "./pages"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { initializeApp } from 'firebase/app'
import { config } from './config/config'
import { AuthRoute } from './components'
import { AuthProvider } from './contexts/AuthContext'

initializeApp(config.firebaseConfig)

export interface AppProps { }

const App: FC<AppProps> = (props) => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path='/'
            element={
              <AuthRoute>
                <MainPage />
              </AuthRoute>}
          />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user' element={<User />} />
          <Route path='/movie/:id' element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
