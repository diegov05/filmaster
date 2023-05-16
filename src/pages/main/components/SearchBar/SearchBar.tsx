import { useState } from 'react';
import axios from 'axios';
import { key } from '../../constants/requests';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Movie } from '../../../../interfaces/interfaces';

import './SearchBar.css'
import { MovieResult } from './MovieResult';

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
                className="cursor-pointer relative z-10 h-12 w-12 border-white bg-transparent pl-8 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4 focus:border-b focus:border-solid text-white" value={query} onChange={handleSearch} />
            <MagnifyingGlassIcon className='absolute inset-y-0 my-auto custom__icon magnifying__icon' />

            {results.length > 0 && (
                <div onClick={() => console.log("clicked")} className='bg-zinc-800 rounded-xl h-96 w-full z-40 absolute'>
                    {results.map((movie) => <MovieResult movie={movie} key={movie.id} mediaType={movie.media_type} />)}
                </div>
            )
            }
        </div >
    );
}
