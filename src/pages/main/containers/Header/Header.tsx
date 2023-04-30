import React, { FC, useEffect, useState } from 'react'
import { BookmarkIcon, PlayIcon, CheckIcon } from '@heroicons/react/24/outline'
import { requests } from '../../constants'
import { StarRating } from '../../components'
import { useId } from 'react'
import axios from 'axios'
import "./Header.css"
import { Movie, MovieDetails, UserFavorites } from '../../../../interfaces/interfaces'
import { key } from '../../constants/requests'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { arrayRemove, arrayUnion, collection, doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'

export const Header: FC = () => {
    const [movieId, setMovieId] = useState<number | null>(null);
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [userFavorites, setUserFavorites] = useState<string[]>()


    const auth = getAuth()

    const mediaType = movie?.name ? "tv" : "movie"

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${key}`
                );
                const data = response.data

                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMovieId = data.results[randomIndex].id;

                setMovieId(randomMovieId);

                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=${key}`
                );
                const movieData = movieResponse.data
                setMovieDetails(movieData);
                setMovie(movieData)

                const userId = auth.currentUser?.uid;
                const userFavoritesRef = doc(collection(getFirestore(), 'user'), userId);

                onSnapshot(userFavoritesRef, (snapshot) => {
                    const userFavoritesData = snapshot.data() as UserFavorites;
                    setUserFavorites(userFavoritesData.favorites);
                });

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const addToFavorites = (movieId: string | undefined, mediaType: string | null) => {
        const userId = auth.currentUser?.uid;
        const userFavoritesRef = doc(collection(getFirestore(), 'user'), userId);

        if (!movieId) {
            return <div>...</div>
        }

        if (userFavorites?.includes(`${movieId} ${mediaType}`)) {
            updateDoc(userFavoritesRef, {
                favorites: arrayRemove(`${movieId} ${mediaType}`),
            });
        } else {
            updateDoc(userFavoritesRef, {
                favorites: arrayUnion(`${movieId} ${mediaType}`),
            });
        }
    }

    return (
        <>
            <div className='w-full h-[650px]'>
                <div className='flex w-full h-full'>
                    <div className="absolute w-full h-[650px] bg-gradient-to-tr from-black"></div>
                    <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.title} />
                    <div className='flex-col justify-start items-start absolute w-7/12 top-[50%] p-4 md:p-8'>
                        <h1 className={`headtext text-6xl overflow-hidden cursor-default`}>{movie?.name ? movie?.name : movie?.title ? movie?.title : movie?.name}</h1>
                        <div className='flex gap-4 mt-4'>
                            <StarRating initialValue={movie?.vote_average!} size='xl' id={useId()} />
                            <div className='flex gap-2'>
                                <div onClick={() => addToFavorites(movie?.id.toString(), mediaType)} className='transition-all hover:bg-amber-400 flex justify-center items-center border-solid border-x border-y border-amber-400 rounded-3xl w-9 h-9'>
                                    {userFavorites?.includes(`${movie?.id} ${mediaType}`) ? <CheckIcon className='custom__icon transition-all hover:text-white text-amber-40 w-7 h-7' /> : <BookmarkIcon className='custom__icon transition-all hover:text-white text-amber-400 fill-amber-400 w-7 h-7' />}
                                </div>
                                <Link
                                    to={{
                                        pathname: `/movie/${movie?.id}`,
                                        search: `?mediatype=${mediaType}`,
                                    }}
                                >
                                    <div className='transition-all hover:bg-purple-600 hover:border-purple-600 flex justify-center items-center border-solid border-purple-600 border-x border-y bg-transparent rounded-3xl w-9 h-9 '>
                                        <PlayIcon className='transition-all hover:text-white text-purple-600 fill-purple-600 custom__icon w-7 h-7' />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='flex m-0 p-0 justify-start items-center gap-4'>
                            <span className='transition-all hover:text-white hover: cursor-default text-gray-600 text-lg'>({movie?.vote_count})</span>
                            <span className='transition-all hover:text-white hover: cursor-default text-gray-600 text-lg'>{movie?.genres[0].name}</span>
                            <span className='transition-all hover:text-white hover: cursor-default text-gray-600 text-lg'>{movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
