import { FC, useEffect, useState } from 'react'
import { MainPage, Login, SignUp, User } from "./pages"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { initializeApp } from 'firebase/app'
import { config } from './config/config'
import { AuthRoute } from './components'
import { getAuth, onAuthStateChanged, User as UserInterface } from 'firebase/auth'

initializeApp(config.firebaseConfig)

export interface AppProps { }

const App: FC<AppProps> = (props) => {

  const auth = getAuth()

  const [firebaseUser, setFirebaseUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
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
        <Route path='/user' element={<User user={auth.currentUser!} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
