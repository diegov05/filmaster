import React from 'react';
import { Movie } from '../../../../interfaces/interfaces';
import { ChevronDoubleUpIcon, StarIcon } from '@heroicons/react/24/outline';


export type IHeaderProps = {
    movie: Movie | null
}

const Header: React.FC<IHeaderProps> = (props) => {

    const { movie } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div className='flex flex-row justify-between items-center w-full'>
            <h1 className='text-3xl w-[30ch] text-white font-black headtext__inter'>{movie.title ? movie.title : movie.name}</h1>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-col gap-1'>
                    <h3 className='subtitle text-sm text-[#515151] font-black'>TMDB Rating</h3>
                    <div className='flex flex-row gap-2 justify-start items-center'>
                        <StarIcon className='w-8 fill-amber-400' />
                        <span className='headtext'>{movie.vote_average.toString().slice(0, 3)}</span><span className='headtext text-base font-extralight'>/ 10</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='subtitle text-sm text-[#515151] font-black'>Popularity</h3>
                    <div className='flex flex-row gap-2 justify-start items-center'>
                        <ChevronDoubleUpIcon className='w-6 text-green-600' />
                        <span className='headtext'>{Math.floor(movie.popularity)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Header };