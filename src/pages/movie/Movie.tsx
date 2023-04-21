import React, { useEffect, useState } from 'react';
import { movie } from '../main/containers';
import { NavBar } from '../main/components';
import { getAuth } from 'firebase/auth';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { key } from '../main/constants/requests';
import { StarIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import { Movie, MovieDetails, Provider, Review, LocationState } from '../../interfaces/interfaces';

export type IMovieProps = {
}

const Movie: React.FC<IMovieProps> = (props) => {

    const movieId = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mediaType = searchParams.get('mediatype');

    const id = movieId.id

    const [movie, setMovie] = useState<Movie | null>(null)

    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)

    const [trailerKey, setTrailerKey] = useState<string | null>(null)

    const auth = getAuth()

    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${key}&append_to_response=watch/providers,reviews`);
            const data = await response.json();
            setMovie(data);
        }

        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${key}&language=en-US`)
            .then(response => {
                const videos = response.data.results.filter((video: any) => video.type === 'Trailer');
                if (videos.length > 0) {
                    setTrailerKey(videos[0].key);
                }
            })
            .catch(error => console.error(error));
    }, [movieId, key]);

    useEffect(() => {
        async function fetchMovieDetails() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/${mediaType}/${movie?.id}?api_key=${key}&append_to_response=credits`
            );

            setMovieDetails(response.data);
        }

        fetchMovieDetails();
    }, [movie?.id]);


    if (!movie) {
        return <div>Loading...</div>;
    }

    const reviews = movie.reviews?.results

    //@ts-expect-error
    const providers = movie["watch/providers"].results["US"] === undefined ? null : movie["watch/providers"].results;

    const streamingProviders = providers !== null ? providers["US"].flatrate ? providers["US"].flatrate : providers["US"].buy : null;



    const sortedProviders = streamingProviders !== null ? [...streamingProviders].sort(
        (a, b) => a.display_priority - b.display_priority
    ) : null;

    return (
        <div>
            <div className='flex flex-col bg-[#141414] w-full h-20' >
                <NavBar authed={auth.currentUser?.isAnonymous ? false : true} />
            </div>

            <div className=' absolute w-full z-10 mt-6 p-4'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl w-[30ch] text-white headtext'>{movie.title}</h1>
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
                <div className='flex flex-row justify-start items-start gap-8'>
                    <div className='flex flex-col justify-start items-start gap-4'>
                        <img className="w-[30rem]" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.title}`} />
                        <div className='flex flex-row gap-2'>
                            {movie.genres.slice(0, 3).map(genre => <button key={genre.id
                            } className='custom__button flex justify-center items-center headtext font-bold transition-all text-xs hover:bg-amber-400 hover:text-black hover:border-amber-400'>{genre.name}</button>)}
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        {trailerKey && (
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="Trailer"
                                allowFullScreen
                            />
                        )}
                        <div className='w-full border-b border-zinc-500'>
                            <h2 className='uppercase text-lg font-thin tracking-widest subtitle'>Overview</h2>
                        </div>
                        <p className='paragraph text-lg font-normal'>{movie.overview}</p>
                    </div>
                </div>
                <div className='flex flex-row w-full mt-8 justify-start gap-8 border-t border-zinc-500 pt-16'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='subtitle text-xl uppercase tracking-widest'>Where to Watch</h1>
                        {sortedProviders?.map((provider: Provider) => (
                            <div key={provider.provider_id} className='bg-[#212121] p-4 flex justify-start items-center flex-row gap-2 cursor-pointer hover:bg-zinc-900 transition-all'>
                                <img className='w-10' src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt="" />
                                <h2 className='paragraph'>{provider.provider_name}</h2>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='subtitle text-xl uppercase tracking-widest'>Cast</h1>
                            <div className='flex flex-row gap-8'>
                                <div className='flex flex-col gap-2'>
                                    {movieDetails?.credits.cast.slice(0, 3).map((castMember) => (
                                        <div key={castMember.id} className='p-4 bg-[#212121] flex flex-row gap-4 hover:bg-zinc-900 transition-all'>
                                            <img
                                                className='w-12 rounded-[]'
                                                src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
                                                alt={`${castMember.name}`} />
                                            <div className='flex flex-col'>
                                                <h2 className='cursor-default headtext text-base'>{castMember.name}</h2>
                                                <h2 className='cursor-default subtitle text-base'>as {castMember.character}</h2>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    {movieDetails?.credits.cast.slice(3, 6).map((castMember) => (
                                        <div key={castMember.id} className='p-4 bg-[#212121] flex flex-col hover:bg-zinc-900 transition-all'>
                                            <div className='flex flex-row gap-4'>
                                                <img
                                                    className='w-12'
                                                    src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
                                                    alt={`${castMember.name}`} />
                                                <div>
                                                    <h2 className='cursor-default headtext text-base'>{castMember.name}</h2>
                                                    <h2 className='cursor-default subtitle text-base'>as {castMember.character}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1 className='subtitle text-xl uppercase tracking-widest'>Reviews</h1>
                        <div className='flex flex-col gap-4'>
                            {reviews?.slice(0, 4).map((review) => (
                                <div key={review.id} className='flex flex-col gap-2'>
                                    <div className='flex flex-row justify-start items-center gap-2'>
                                        <h2 className='paragraph font-bold text-sm'>{review.author}</h2>
                                        <h2 className='subtitle text-sm'>{review.created_at.slice(0, 10)}</h2>
                                    </div>
                                    <div className='flex flex-row gap-2 justify-start items-center'>
                                        <StarIcon className='w-4 fill-violet-400' />
                                        <span className='text-sm headtext'>{review.author_details.rating?.toString().slice(0, 3)}</span><span className='headtext text-xs font-extralight'>/ 10</span>
                                    </div>
                                    <p className='paragraph text-sm font-light max-w-sm'>{review.content.slice(0, 200)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export { Movie };