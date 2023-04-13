import { FC, useState } from 'react'
import { Header, Catalog, CatalogList, Footer } from './containers'
import { NavBar } from './components'
import { getAuth, signOut } from 'firebase/auth'

interface IHomePageProps { }

export const MainPage: React.FunctionComponent<IHomePageProps> = (props) => {
    const auth = getAuth()

    return (
        <>
            <NavBar authed={auth.currentUser?.isAnonymous ? false : true} />
            <Header />
            <Catalog title='Movies' identifier="movies" />
            <Catalog title='Series' identifier="series" />
            <CatalogList />
            <Footer />
        </>
    )
}


