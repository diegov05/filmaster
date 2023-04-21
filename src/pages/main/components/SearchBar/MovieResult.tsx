import React from 'react';
import { Movie } from './SearchBar';
import { Link } from 'react-router-dom';

export type IMovieResultProps = {
    movie: Movie
}

const MovieResult: React.FC<IMovieResultProps> = (props) => {

    const movie = props.movie

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className='z-50 p-4 flex flex-row justify-start items-start gap-4 border-b border-zinc-600 hover:bg-black cursor-pointer transition-all' key={movie.id}>
                < img className='w-12' src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt={movie.title} />
                <div className='flex flex-col gap-2'>
                    <p className='paragraph text-xs max-w-[12ch]'>{movie.title ? movie.title : movie.name}</p>
                    <div className='flex flex-row justify-start items-start gap-1'>
                        {movie.release_date ? (parseInt(movie.release_date.slice(0, 4)) > 2021 ? <div className='headtext py-0 px-1 text-[.5rem] custom__button bg-green-400 border-0 outline-0 text-black'>NEW</div> : "") : movie.media_type !== "Movie" ? <div className='headtext py-0 px-1 text-[.5rem] custom__button bg-green-400 border-0 outline-0 text-black'>TV</div> : ""}
                        {movie.vote_count > 1000 ? <div className='headtext py-0 px-1 text-[.5rem] custom__button bg-amber-400 border-0 outline-0 text-black'>POPULAR</div> : ""}

                    </div>
                </div>
            </div>
        </Link>
    );
}

export { MovieResult };