import { getAuth } from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Movie, UserFavorites } from '../../../../interfaces/interfaces';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../../../../contexts/AuthContext';

export type IAddFavoritesButtonProps = {
    userFavorites: string[] | undefined
    movie: Movie
    mediaType: string | null
}



const AddFavoritesButton: React.FC<IAddFavoritesButtonProps> = (props) => {

    const { movie, mediaType, userFavorites } = props

    const user = useContext(AuthContext)

    if (!user) {
        return <div>User not logged in.</div>
    }

    const userFavoritesRef = doc(collection(getFirestore(), 'user'), user.uid);

    const addToFavorites = (movieId: string | undefined, mediaType: string | null) => {

        const userFavoritesRef = doc(collection(getFirestore(), 'user'), user.uid);

        if (!movieId) {
            return <div>...</div>
        }

        if (!userFavorites) {
            return <div>Favorites not fetched.</div>
        }

        if (userFavorites.includes(`${movieId} ${mediaType}`)) {
            updateDoc(userFavoritesRef, {
                favorites: arrayRemove(`${movieId} ${mediaType}`),
            });
        } else {
            updateDoc(userFavoritesRef, {
                favorites: arrayUnion(`${movieId} ${mediaType}`),
            });
        }
    }

    if (!userFavorites) {
        return <div>Favorites not fetched.</div>
    }

    return (
        <div>
            <button onClick={() => addToFavorites(movie.id.toString(), mediaType)} className={`flex flex-col justify-center items-center w-max custom__button headtext uppercase rounded-none outline-0 border-0 py-4 px-8 text-black hover:text-amber-400
                         ${userFavorites.includes(`${movie.id} ${mediaType}`)
                    ? "bg-zinc-800 hover:bg-amber-400" :
                    "bg-amber-400 hover:bg-zinc-800"}         
                        `}
            >{userFavorites.includes(`${movie.id} ${mediaType}`) ? <CheckCircleIcon className={`w-5 h-5 ${userFavorites.includes(`${movie.id} ${mediaType}`)
                ? "text-amber-400" :
                "text-black"} `} /> : "Add to Favorites"}</button>
        </div>
    );
}

export { AddFavoritesButton };