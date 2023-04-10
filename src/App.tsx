import { useState } from 'react'
import './App.css'
import { MainPage, Login } from "./pages"

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {loggedIn ? <MainPage /> : <Login />}
    </>
  )
}

export default App
