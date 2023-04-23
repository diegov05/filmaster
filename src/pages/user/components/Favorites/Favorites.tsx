import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../../main/components';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { key } from '../../../main/constants/requests';
import { UserFavorites, Movie } from '../../../../interfaces/interfaces';

export type IFavoritesProps = {

}

const Favorites: React.FC<IFavoritesProps> = (props) => {

    const auth = getAuth()

    const [movies, setMovies] = useState<Movie[] | null>(null)

    useEffect(() => {
        const userId = auth.currentUser!.uid;
        const userFavoritesRef = doc(collection(getFirestore(), 'user'), userId);

        onSnapshot(userFavoritesRef, (snapshot) => {
            const userFavoritesData = snapshot.data() as UserFavorites;
            const stringIds: string[] = [];
            const movieArr: { id: string, mediaType: string }[] = [];

            userFavoritesData.favorites.forEach((movie) => {
                stringIds.push(movie.replace(/\D+/g, ''))
                const mediaType = movie.replace(/^[\s\d]+/, '')
                movieArr.push({ id: movie.replace(/\D+/g, ''), mediaType: mediaType })
            })
            const fetchMovies = async () => {
                const moviePromises = movieArr.map((movie) =>
                    axios.get(
                        `https://api.themoviedb.org/3/${movie.mediaType}/${parseInt(movie.id)}?api_key=${key}&language=en-US`
                    ));
                const movieResponses = await Promise.all(moviePromises);
                const movieData = movieResponses.map((response) => response.data);
                setMovies(movieData);
            };
            fetchMovies();
        });
    }, [])

    return (
        <div className='flex flex-row flex-wrap justify-start items-start gap-2'>
            {movies?.map((movie => (
                <div className='w-max' key={movie.id}>
                    <MovieCard key={movie.id} movie={movie} mediaType={movie.name ? "tv" : "movie"} />
                </div>
            )))
            }
        </div >
    );
}

export { Favorites };