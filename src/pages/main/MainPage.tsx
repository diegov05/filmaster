import { FC, useContext, useState } from 'react'
import { Header, Catalog, CatalogList, Footer } from './containers'
import { NavBar } from './components'
import { getAuth, signOut } from 'firebase/auth'
import { AuthContext, AuthProvider } from '../../contexts/AuthContext'

interface IHomePageProps { }

export const MainPage: React.FunctionComponent<IHomePageProps> = (props) => {

    const user = useContext(AuthContext)

    if (!user) {
        return <div>User not logged in.</div>
    }

    return (
        <>
            <AuthProvider>
                <NavBar authed={user.isAnonymous ? false : true} />
                <Header />
                <Catalog title='Movies' identifier="movies" />
                <Catalog title='Series' identifier="series" />
                <CatalogList />
                <Footer />
            </AuthProvider >
        </>
    )
}


