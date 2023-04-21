import React, { FC, useEffect, useState } from 'react'
import { BookmarkIcon, PlayIcon } from '@heroicons/react/24/outline'
import { requests } from '../../constants'
import { StarRating } from '../../components'
import { useId } from 'react'
import axios from 'axios'
import "./Header.css"
import { Movie, MovieDetails } from '../../../../interfaces/interfaces'
import { key } from '../../constants/requests'

export const Header: FC = () => {
    const [movieId, setMovieId] = useState<number | null>(null);
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${key}`
                );
                const data = await response.json();

                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMovieId = data.results[randomIndex].id;

                setMovieId(randomMovieId);

                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=${key}`
                );
                const movieData = await movieResponse.json();
                setMovieDetails(movieData);
                setMovie(movieData)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

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
                                <div className='transition-all hover:bg-amber-400 flex justify-center items-center border-solid border-x border-y border-amber-400 rounded-3xl w-9 h-9'>
                                    <BookmarkIcon className='custom__icon transition-all hover:text-white text-amber-400 fill-amber-400 w-7 h-7' />
                                </div>

                                <div className='transition-all hover:bg-purple-600 hover:border-purple-600 flex justify-center items-center border-solid border-purple-600 border-x border-y bg-transparent rounded-3xl w-9 h-9 '>
                                    <PlayIcon className='transition-all hover:text-white text-purple-600 fill-purple-600 custom__icon w-7 h-7' />
                                </div>
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
