import { useState } from 'react';
import axios from 'axios';
import { key } from '../../constants/requests';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StarRating } from '../StarRating/StarRating';

import './SearchBar.css'

interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    } | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    name: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    last_air_date: string;
    media_type: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Movie[]>([]);

    async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;
        setQuery(query);

        if (query.length > 0) {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${query}`
            );

            const moviesAndSeries = response.data.results.filter(
                (result: any) => result.media_type === 'movie' || result.media_type === 'tv'
            );

            setResults(moviesAndSeries);
        } else {
            setResults([]);
        }
    }


    return (
        <div>
            <input type="search"
                className=" peer cursor-pointer relative z-10 h-12 w-12 border-white bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4 focus:border-b focus:border-solid text-white" value={query} onChange={handleSearch} />
            <MagnifyingGlassIcon className='absolute inset-y-0 my-auto custom__icon magnifying__icon' />

            {results.length > 0 && (
                <div className='scrollbar mt-2 bg-zinc-800 rounded-xl first-letter: h-96 w-full z-50 absolute'>
                    {results.map((movie) => (
                        <div className='p-4 flex flex-row justify-start items-start gap-4 border-b border-zinc-600 hover:bg-black cursor-pointer transition-all' key={movie.id}>
                            <img className='w-12' src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} alt={movie.title} />
                            <div className='flex flex-col gap-2'>
                                <p className='paragraph text-xs max-w-[12ch]'>{movie.title ? movie.title : movie.name}</p>
                                <div className='flex flex-row justify-start items-start gap-1'>
                                    {movie.release_date ? (parseInt(movie.release_date.slice(0, 4)) > 2021 ? <div className='headtext py-0 px-1 text-[.5rem] custom__button bg-green-400 border-0 outline-0 text-black'>NEW</div> : "") : movie.media_type !== "Movie" ? <div className='headtext py-0 px-1 text-[.5rem] custom__button bg-green-400 border-0 outline-0 text-black'>TV</div> : ""}
                                    {movie.vote_count > 1000 ? <div className='headtext py-0 px-1 text-[.5rem] custom__button bg-amber-400 border-0 outline-0 text-black'>POPULAR</div> : ""}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}
