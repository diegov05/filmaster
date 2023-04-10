import { useState } from 'react'
import { Header, Catalog, CatalogList, Footer } from './containers'
import { NavBar } from './components'

function MainPage() {

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

export { MainPage }
