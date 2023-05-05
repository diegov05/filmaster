import React, { FC, useEffect, useState } from 'react'
import "./CatalogList.css"
import { requests } from '../../constants'
import axios from 'axios'
import { movie } from '../../containers'
import { Slider } from '../../components'

export const CatalogList: FC = () => {

    const [premieresMovies, setPremieresMovies] = useState([])
    const [featuredMovies, setFeaturedMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    const movie: movie = premieresMovies[Math.floor(Math.random() * premieresMovies.length)]

    useEffect(() => {
        axios.get(requests.trendingMoviesRequest).then((response) => {
            setPremieresMovies(response.data.results)
        })
    }, [])

    useEffect(() => {
        axios.get(requests.popularMoviesRequest).then((response) => {
            setFeaturedMovies(response.data.results)
        })
    }, [])

    useEffect(() => {
        axios.get(requests.upcomingMoviesRequest).then((response) => {
            setUpcomingMovies(response.data.results)
        })
    }, [])


    return (
        <div className='flex flex-col xl:flex-row justify-start items-start m-6 mt-16 gap-6 xl:gap-5'>
            <div className='flex flex-col w-full gap-6'>
                <Slider movies={premieresMovies} />
                <Slider movies={featuredMovies} />
                <Slider movies={upcomingMovies} />
            </div>
            <div className='w-1/2 hidden xl:flex flex-col justify-center items-center'>
                <img className='h-[300px] xl:h-[650px] rounded-xl' src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="mario" />
                <h1 className='headtext from-indigo-500 via-purple-500 to-amber-500 bg-clip-text bg-gradient-to-r text-transparent uppercase mt-4 text-2xl'>Coming Soon</h1>
            </div>
        </div >
    )
}
