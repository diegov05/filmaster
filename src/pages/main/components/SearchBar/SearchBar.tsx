import { MouseEventHandler, ReactElement, useState } from 'react';
import axios from 'axios';
import { key } from '../../constants/requests';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StarRating } from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom'

import { Provider } from '../../../movie/Movie';

import './SearchBar.css'
import { MovieResult } from './MovieResult';

export interface Movie {
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
    watchProviders: {
        [countryCode: string]: {
            link: string;
            flatrate: Provider[];
            rent: Provider[];
            buy: Provider[];
        };
    };
}

export const SearchBar = () => {
    const navigate = useNavigate()
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

    const handleClick = (movieId: number) => {
        navigate(`/movie/${movieId}`)
    }

    return (
        <div>
            <input type="search"
                className=" peer cursor-pointer relative z-50 h-12 w-12 border-white bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4 focus:border-b focus:border-solid text-white" value={query} onChange={handleSearch} />
            <MagnifyingGlassIcon className='absolute inset-y-0 my-auto custom__icon magnifying__icon' />

            {results.length > 0 && (
                <div className='scrollbar mt-2 bg-zinc-800 rounded-xl first-letter: h-96 w-full z-50 absolute'>
                    {results.map((movie) => < MovieResult movie={movie
                    } />)}
                </div>
            )
            }
        </div >
    );
}
