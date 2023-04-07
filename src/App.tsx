import { useState } from 'react'
import './App.css'
import { Header, Catalog, CatalogList, Footer } from './containers'
import { NavBar } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Header />
      <Catalog title='Movies' identifier="movies" />
      <Catalog title='Series' identifier="series" />
      <CatalogList />
      <Footer />
    </>
  )
}

export default App
