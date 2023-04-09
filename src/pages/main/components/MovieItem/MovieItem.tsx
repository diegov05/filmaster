import React, { FC } from 'react'
import { movie } from '../../containers'
import { StarRating } from '../StarRating/StarRating'
import { useId } from 'react'
import "./MovieItem.css"

interface Props {
    movie: movie
}

export const MovieItem: FC<Props> = (props) => {
    return (
        <div className='flex flex-row justify-start items-start gap-4 transition-all hover:bg-neutral-900 p-4 rounded-lg'>
            <img className='w-24 transition-all hover:opacity-50 cursor-pointer' src={`https://image.tmdb.org/t/p/original${props.movie?.poster_path}`} alt={`${props.movie?.original_name}`} />
            <div className='flex flex-col gap-2'>
                <h1 className='headtext text-xs'>{props.movie?.title ? props.movie?.title : props.movie?.original_name}</h1>
                <div className='flex flex-row justify-start items-center gap-1'>
                    <button className='custom__button px-1 py-0 border-none text-xs bg-amber-400'>HD</button>
                    <StarRating initialValue={props.movie?.vote_average!} size={"xs"} id={useId()} />
                </div>
                <p className='text-xs subtitle max-w-[20ch]'>{props.movie?.overview?.slice(0, 100)}...</p>
                <a href="#">
                    <h1 className='headtext uppercase text-xs'>See more...</h1>
                </a>
            </div>
        </div>
    )
}
