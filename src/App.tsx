import { useState } from 'react'
import './App.css'
import { Header, Catalog, CatalogList, Footer } from './containers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Catalog title='Movies' data={[]} />
      <Catalog title='Series' data={[]} />
      <CatalogList />
      <Footer />
    </>
  )
}

export default App
