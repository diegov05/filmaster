import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { requests } from '../../constants'
import { MovieCard } from '../../components'
import { Movie } from '../../../../interfaces/interfaces'

import "./Catalog.css"

interface Props {
    title: string,
    identifier: string
}

export const Catalog: FC<Props> = (props) => {

    const [shows, setShows] = useState<Movie[]>([])

    const [trendingShows, setTrendingShows] = useState([])
    const [recentShows, setRecentShows] = useState([])
    const [topShows, setTopShows] = useState([])

    const [isPressed, setIsPressed] = useState(true)

    useEffect(() => {
        switch (props.identifier) {
            case "movies":
                axios.get(requests.popularMoviesRequest).then((response) => {
                    setShows(response.data.results);
                })

                break;
            case "series":
                axios.get(requests.popularSeriesRequest).then((response) => {
                    setShows(response.data.results);
                })
                break;

        }
    }, [])

    const handleClick = () => {
        setIsPressed(prevState => !prevState)
    }

    const handleChangeShows = (id: number) => {
        switch (props.identifier) {
            case "movies":
                switch (id) {
                    case 0:
                        axios.get(requests.upcomingMoviesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                    case 1:
                        axios.get(requests.popularMoviesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                    case 2:
                        axios.get(requests.topRatedMoviesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                    default:
                        axios.get(requests.popularMoviesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                }
                break;
            case "series":
                switch (id) {
                    case 0:
                        axios.get(requests.onAirSeriesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                    case 1:
                        axios.get(requests.popularSeriesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                    case 2:
                        axios.get(requests.topRatedSeriesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                    default:
                        axios.get(requests.popularSeriesRequest).then((response) => {
                            setShows(response.data.results);
                        })
                        break;
                }
                break;
        }
    }
    return (
        <div>
            <div className="flex flex-row justify-between m-8">
                <div className='flex flex-row justify-start items-center gap-5 sm:gap-5 md:gap-5 lg:gap-12 xl:gap-12'>
                    <h1 className='headtext uppercase text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl'>{props.title}</h1>
                    <button onClick={() => handleChangeShows(0)} className='headtext border-b border-transparent transition-all hover:-mt-2 hover:border-b hover:border-purple-600 font-normal uppercase text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl cursor-pointer'>Recent {props.title}</button>
                    <button onClick={() => handleChangeShows(1)} className='headtext border-b border-transparent transition-all hover:-mt-2 hover:border-b hover:border-purple-600 font-normal uppercase text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl cursor-pointer'>Trending</button>
                    <button onClick={() => handleChangeShows(2)} className='headtext border-b border-transparent transition-all hover:-mt-2 hover:border-b hover:border-purple-600 font-normal uppercase text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl cursor-pointer'>Ranked</button>
                </div>
                <div className='flex justify-center items-center'>
                    <button className='custom__button border-none hover:bg-amber-400 bg-purple-700 text-white uppercase' onClick={() => handleClick()}>See More</button>
                </div>
            </div>
            <div className='flex flex-row flex-wrap justify-center items-center gap-8'>
                {isPressed ? shows.slice(0, 12).map((movie: Movie) => (
                    <div className='flex flew-col justify-center items-center flex-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5' key={movie?.id}>
                        <MovieCard movie={movie} mediaType={movie.name ? "tv" : "movie"} key={movie?.id} />
                    </div>
                )) : shows.slice(0, 15).map((movie: Movie) => (
                    <div className='flex-1 basis-1/6' key={movie?.id}>
                        <MovieCard movie={movie} mediaType={movie.name ? "tv" : "movie"} key={movie?.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
