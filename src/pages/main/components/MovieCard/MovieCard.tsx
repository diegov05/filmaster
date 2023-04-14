import React, { FC, useEffect, useState } from 'react'
import { movie, genre } from '../../containers'
import { PlayIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { requests } from '../../constants'
import { key } from '../../constants/requests'
import "./MovieCard.css"
import { StarRating } from '../../components'
import axios from 'axios'


interface Props {
    movie: movie
}

export const MovieCard: FC<Props> = (props) => {

    const [movieGenres, setMovieGenres] = useState([])
    const [seriesGenres, setSeriesGenres] = useState([])
    const [movieCrew, setMovieCrew] = useState([])
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)

    const handleHover = () => {
        setIsPreviewVisible(prevState => !prevState)
    }

    const movie = props.movie

    const index: number = movie?.genre_ids![0] ? movie?.genre_ids![0] : movie?.genre_ids![1];
    const genre: genre = movieGenres.find((genre: genre) => genre.id === index)! ? movieGenres.find((genre: genre) => genre.id === index)! : seriesGenres.find((genre: genre) => genre.id === index)!

    const movieCrewRequest = `https://api.themoviedb.org/3/movie/${props.movie?.id}/credits?api_key=${key}&language=en-US`



    useEffect(() => {
        axios.get(movieCrewRequest).then((response) => {
            setMovieCrew(response.data)
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
            <div className='movie-card flex flex-col justify-center items-center gap-8 transition-all'>
                <img className='transition-all duration-300 hover:opacity-50 cursor-pointer rounded-3xl h-96 w-64 mt-5' src={`https://image.tmdb.org/t/p/original${props.movie?.poster_path}`} alt={`${props.movie?.title}`} />
                <PlayIcon className='custom__icon fill-amber-400 border-none outline-none text-transparent absolute w-10 h-10 opacity-0' />

                <div className='transition-all duration-200 bg-black rounded-lg flex flex-col justify-start items-start absolute opacity-0 w-64 h-96 ml-16 mb-36'>
                    <div className="flex flex-col gap-1 w-full justify-start absolute z-10 m-4">
                        <div className='flex flex-row justify-between items-center mr-8'>
                            <div className="flex flex-row gap-2 justify-start items-center">
                                <h3 className='headtext text-xs max-w-[15ch]'>{props.movie?.title ? props.movie?.title : props.movie?.original_name}</h3>
                                <button className='border-none bg-purple-600 text-white px-1.5 py-0 text-[.4rem] custom__button'>HD</button>
                            </div>
                            <div className='transition-all hover:bg-amber-400 flex justify-center items-center border-solid border-x border-y border-amber-400 rounded-3xl w-6 h-6'>
                                <BookmarkIcon className='custom__icon transition-all hover:text-white text-amber-400 fill-amber-400 w-4 h-4' />
                            </div>
                        </div>
                        <div className='flex flex-row gap-1'>
                            <StarRating initialValue={props.movie?.vote_average!} size={"xtrasmall"} id={React.useId()} />
                            <p className='subtitle cursor-default text-xs'>({props.movie?.vote_count})</p>
                            <p className='subtitle cursor-default max-w-[10ch] text-xs'>{genre?.name}</p>
                            <p className='subtitle cursor-default text-xs'>{props.movie?.release_date?.slice(0, 4)}</p>
                        </div>
                        <p className='subtitle cursor-default text-start max-w-[25ch] text-sm'>
                            {props.movie?.overview?.slice(0, 200)}...
                        </p>
                        <p className='text-white font-semibold cursor-default'>Director: <span className='subtitle cursor-default text-xs'></span></p>
                        <p className='text-white font-semibold cursor-default'>Genres: <span className='subtitle cursor-default text-xs'></span></p>
                        <p className='text-white font-semibold cursor-default'>Cast: <span className='subtitle cursor-default text-xs'></span></p>
                    </div>
                    <img className='transition-all opacity-50 blur-sm cursor-pointer rounded-3xl h-96 w-64 absolute' src={`https://image.tmdb.org/t/p/original${props.movie?.poster_path}`} alt={`${props.movie?.title}`} />
                </div>
                <h3 className='paragraph capitalize cursor-default mb-5'>{props.movie?.title ? props.movie?.title : props.movie?.original_name}</h3>
            </div >
        </>
    )
}
