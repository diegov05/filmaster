import { useState } from 'react'
import './App.css'
import { MainPage, Login, SignUp } from "./pages"
const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {loggedIn ? <MainPage /> : <SignUp />}
    </>
  )
}

export default App
