import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { requests } from '../../constants'
import { MovieCard } from '../../components'
import { movie } from '../../containers'

import "./Catalog.css"

interface Props {
    title: string,
    identifier: string
}

export const Catalog: FC<Props> = (props) => {

    const [shows, setShows] = useState([])
    const [isPressed, setIsPressed] = useState(true)

    useEffect(() => {
        switch (props.identifier) {
            case "movies":
                axios.get(requests.popularMoviesRequest).then((response) => {
                    setShows(response.data.results)
                })
                break;
            case "series":
                axios.get(requests.topRatedSeriesRequest).then((response) => {
                    setShows(response.data.results)
                })
        }
    }, [])

    const handleClick = () => {
        setIsPressed(prevState => !prevState)
    }


    return (
        <div>
            <div className="flex flex-row justify-between m-8">
                <div className='flex justify-start items-center gap-12'>
                    <h1 className='headtext uppercase text-2xl'>{props.title}</h1>
                    <h1 className='headtext border-b border-transparent transition-all hover:-mt-2 hover:border-b hover:border-purple-600 font-normal uppercase text-2xl cursor-pointer'>Recent {props.title}</h1>
                    <h1 className='headtext border-b border-transparent transition-all hover:-mt-2 hover:border-b hover:border-purple-600 font-normal uppercase text-2xl cursor-pointer'>Trending</h1>
                    <h1 className='headtext border-b border-transparent transition-all hover:-mt-2 hover:border-b hover:border-purple-600 font-normal uppercase text-2xl cursor-pointer'>Ranked</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <button className='custom__button border-none hover:bg-amber-400 bg-purple-700 text-white uppercase' onClick={() => handleClick()}>See More</button>
                </div>
            </div>
            <div className='flex flex-row flex-wrap justify-center items-center gap-8'>
                {isPressed ? shows.slice(0, 10).map((movie: movie) => (
                    <div className='flex-1 basis-1/6' key={movie?.id}>
                        <MovieCard movie={movie} key={movie?.id} />
                    </div>
                )) : shows.slice(0, 15).map((movie: movie) => (
                    <div className='flex-1 basis-1/6' key={movie?.id}>
                        <MovieCard movie={movie} key={movie?.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
