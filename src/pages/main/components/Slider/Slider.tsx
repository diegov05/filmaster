import React, { useRef } from 'react';

import { Movie } from '../../../../interfaces/interfaces'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { MovieItem } from '../../components'
import "./Slider.css"

export type ISliderProps = {
    movies: Movie[]
}

const Slider: React.FC<ISliderProps> = (props) => {

    const containerRef = useRef<HTMLDivElement>(null);

    const handleLeftClick = () => {
        containerRef.current?.scrollBy({
            left: -400,
            behavior: "smooth",
        });
    };

    const handleRightClick = () => {
        containerRef.current?.scrollBy({
            left: 400,
            behavior: "smooth",
        });
    };

    const movies = props.movies

    return (
        <div className='w-full'>
            <div className="relative">
                <h1 className='headtext uppercase'>Premieres</h1>
                <div ref={containerRef} className="flex overflow-x-scroll scroll-snap-x-mandatory snap-center  gap-4 py-2">
                    {movies.map((movie: Movie) => (
                        <MovieItem movie={movie} key={movie.id} />
                    ))}
                </div>
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors duration-300"
                    onClick={handleLeftClick}
                >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors duration-300"
                    onClick={handleRightClick}
                >
                    <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                </button>
            </div>
        </div>
    );
}

export { Slider };