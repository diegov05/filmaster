import React from 'react';
import { RatingMovieData } from '../../../../interfaces/interfaces';
import { FaImdb } from 'react-icons/fa';

export type IRatingProps = {
    ratingData: RatingMovieData
}

const Rating: React.FC<IRatingProps> = (props) => {

    const { ratingData } = props

    const imdbData = ratingData.ratings[0]
    const metaScoreData = ratingData.ratings[1]

    if (!ratingData) {
        return <div>Rating data not fetched.</div>
    }

    return (
        <div className='flex flex-row gap-2'>
            <div className='w-min flex flex-row justify-between items-center gap-2 p-1 bg-zinc-800'>
                <FaImdb className='custom__icon w-8 h-8 fill-amber-400' />
                <div className='flex flex-col'>
                    <span className='headtext'>{imdbData.value}</span>
                    <span className='subtitle text-xs'>({imdbData.votes})</span>
                </div>
            </div>
            <div className='w-min flex flex-row justify-between items-center gap-2  bg-zinc-800'>
                <div className={`flex flex-col justify-center items-center h-full ${metaScoreData.score! > 50 && metaScoreData.score! < 70 ? "bg-amber-400" : metaScoreData.score! > 70 ? "bg-green-500" : "bg-red-600"} px-2 py-1`}>
                    <span className='font-black'>{metaScoreData.score}</span>
                </div>
                <div className='flex p-2 flex-col'>
                    <span className='headtext'>Metascore</span>
                </div>
            </div>
        </div>
    );
}

export { Rating };