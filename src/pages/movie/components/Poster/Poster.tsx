import React from 'react';
import { Movie } from '../../../../interfaces/interfaces';

export type IPosterProps = {
    movie: Movie
}

const Poster: React.FC<IPosterProps> = (props) => {

    const { movie } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div className='flex flex-col justify-start items-start gap-4'>
            <img className="w-[40rem]" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title}`} />
            <div className='flex flex-row gap-2'>
                {movie.genres.slice(0, 3).map(genre => <button key={genre.id
                } className='custom__button flex justify-center items-center headtext font-bold transition-all text-xs hover:bg-amber-400 hover:text-black hover:border-amber-400'>{genre.name}</button>)}
            </div>
        </div>
    );
}

export { Poster };