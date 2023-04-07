import React, { FC, useEffect, useState } from 'react'
import { BookmarkIcon, PlayIcon } from '@heroicons/react/24/outline'
import { requests } from '../../constants'
import { StarRating } from '../../components'
import { useId } from 'react'
import axios from 'axios'
import "./Header.css"

export type movie = {
    id?: number
    backdrop_path?: string
    genre_ids?: Array<number>
    adult?: boolean
    title?: string
    original_title?: string
    original_name?: string
    original_language?: string
    overview?: string
    popularity?: number
    poster_path?: string
    release_date?: string
    first_air_date?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
    runtime?: number
}

export type genre = {
    id?: number
    name?: string
}

export const Header: FC = () => {
    const [movies, setMovies] = useState([]);

    const [movieGenres, setMovieGenres] = useState([]);

    const [seriesGenres, setSeriesGenres] = useState([]);

    const movie: movie = movies[Math.floor(Math.random() * movies.length)]

    const index: number = movie?.genre_ids![0] ? movie?.genre_ids![0] : movie?.genre_ids![1];
    const genre: genre = movieGenres.find((genre: genre) => genre.id === index)! ? movieGenres.find((genre: genre) => genre.id === index)! : seriesGenres.find((genre: genre) => genre.id === index)!

    useEffect(() => {
        axios.get(requests.popularMoviesRequest).then((response) => {
            setMovies(response.data.results)
        })
    }, [])

    useEffect(() => {
        axios.get(requests.moviesGenresRequest).then((response) => {
            setMovieGenres(response.data.genres)
        })
    }, [])

    useEffect(() => {
        axios.get(requests.seriesGenresRequest).then((response) => {
            setSeriesGenres(response.data.genres)
        })
    }, [])

    return (
        <>
            <div className='w-full h-[650px]'>
                <div className='flex w-full h-full'>
                    <div className="absolute w-full h-[650px] bg-gradient-to-tr from-black"></div>
                    <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.title} />
                    <div className='flex-col justify-start items-start absolute w-7/12 top-[50%] p-4 md:p-8'>
                        <h1 className={`headtext text-6xl overflow-hidden cursor-default`}>{movie?.original_name ? movie?.original_name : movie?.title ? movie?.title : movie?.original_name}</h1>
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
                            <span className='transition-all hover:text-white hover: cursor-default text-gray-600 text-lg'>{genre?.name}</span>
                            <span className='transition-all hover:text-white hover: cursor-default text-gray-600 text-lg'>{movie?.release_date ? movie?.release_date?.slice(0, 4) : movie?.first_air_date?.slice(0, 4)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
