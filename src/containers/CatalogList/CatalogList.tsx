import React, { FC, useEffect, useState } from 'react'
import "./CatalogList.css"
import { requests, images } from '../../constants'
import axios from 'axios'
import { MovieItem } from '../../components'
import { movie } from '../../containers'

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
        <div className='flex flex-row justify-start items-start m-6  mt-16'>
            <div>
                <h1 className='headtext text-center mb-4 uppercase text-xl border-b border-transparent transition-all cursor-default'>Premieres</h1>
                <div className='flex flex-col gap-1'>
                    {premieresMovies?.slice(0, 4).map((movie: movie) => (
                        <MovieItem movie={movie} key={movie?.id} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className='headtext text-center mb-4 uppercase text-xl border-b border-transparent transition-all cursor-default'>Featured</h1>
                <div className='flex flex-col gap-8'>
                    {featuredMovies?.slice(0, 4).map((movie: movie) => (
                        <MovieItem movie={movie} key={movie?.id} />
                    ))}
                </div>
            </div>
            <div>
                <h1 className='headtext text-center mb-4 uppercase text-xl border-b border-transparent transition-all cursor-default'>Upcoming</h1>
                <div className='flex flex-col gap-8'>
                    {upcomingMovies?.slice(0, 4).map((movie: movie) => (
                        <MovieItem movie={movie} key={movie?.id} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <img className='h-[750px] rounded-xl' src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="mario" />
                <h1 className='headtext from-indigo-500 via-purple-500 to-amber-500 bg-clip-text bg-gradient-to-r text-transparent uppercase mt-4 text-2xl'>Coming Soon</h1>
            </div>
        </div>
    )
}
