import React, { FC, useEffect, useState } from 'react'
import { PlayIcon, BookmarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { key } from '../../constants/requests'
import "./MovieCard.css"
import { StarRating } from '../../components'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { arrayRemove, arrayUnion, collection, doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import 'firebase/compat/firestore';
import { Movie, MovieDetails, UserFavorites } from '../../../../interfaces/interfaces'
import { Link } from 'react-router-dom'

interface Props {
    movie: Movie
    mediaType: string
}

export const MovieCard: FC<Props> = (props) => {

    const [movie, setMovie] = useState<Movie | null>(null)

    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

    const [isFavorite, setIsFavorite] = useState(false);

    const [isHovering, setIsHovering] = useState(false)

    const [userFavorites, setUserFavorites] = useState<string[]>()

    const auth = getAuth()
    const db = getFirestore()

    const handleMouseEnter = () => {
        setIsHovering(true);
        setTimeout(() => setIsHovering(false), 5000);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(`https://api.themoviedb.org/3/${props.mediaType}/${props.movie.id}?api_key=${key}&append_to_response=watch/providers,reviews`);
            const data = await response.json();
            setMovie(data);
        }

        const userId = auth.currentUser?.uid;
        const userFavoritesRef = doc(collection(getFirestore(), 'user'), userId);

        onSnapshot(userFavoritesRef, (snapshot) => {
            const userFavoritesData = snapshot.data() as UserFavorites;
            setUserFavorites(userFavoritesData.favorites);
        });

        async function fetchMovieDetails() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=${key}&append_to_response=credits`
            );
            setMovieDetails(response.data);
        }

        fetchMovieDetails();

        fetchMovie();
        fetchMovieDetails()
    }, [props.movie.id]);

    const addToFavorites = (movieId: string | undefined, mediaType: string | null) => {
        const userId = auth.currentUser?.uid;
        const userFavoritesRef = doc(collection(getFirestore(), 'user'), userId);

        if (!movieId) {
            return <div>...</div>
        }

        if (userFavorites?.includes(`${movieId} ${mediaType}`)) {
            updateDoc(userFavoritesRef, {
                favorites: arrayRemove(`${movieId} ${mediaType}`),
            });
        } else {
            updateDoc(userFavoritesRef, {
                favorites: arrayUnion(`${movieId} ${mediaType}`),
            });
        }
    }

    const mediaType = props.mediaType

    const credits = movieDetails?.credits

    const director = credits?.crew.find((person) => person.department === 'Directing');
    const cast = credits?.cast.slice(0, 3);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='movie-card w-max flex flex-col justify-center items-center gap-8 transition-all'>
            <Link
                className='movie-card flex flex-col justify-center items-center gap-8 transition-all'
                to={{
                    pathname: `/movie/${movie.id}`,
                    search: `?mediatype=${mediaType}`,
                }}
            >
                <img className='transition-all duration-300 hover:opacity-50 cursor-pointer rounded-3xl h-96 w-64 mt-5' src={`https://image.tmdb.org/t/p/original${props.movie?.poster_path}`} alt={`${props.movie?.title}`} />
                <PlayIcon className='custom__icon fill-amber-400 border-none outline-none text-transparent absolute w-10 h-10 opacity-0' />
            </Link >
            {isHovering && <div className='transition-all duration-300 bg-black rounded-lg flex flex-col justify-start items-start absolute opacity-0 w-64 h-96 ml-16 mb-36'>
                <div className="flex flex-col gap-1 w-full justify-start absolute z-10 m-4">
                    <div className='flex flex-row justify-between items-center mr-8'>
                        <div className="flex flex-row gap-2 justify-start items-center">
                            <h3 className='headtext text-xs max-w-[15ch]'>{props.movie?.title ? props.movie?.title : props.movie?.name}</h3>
                            <button className='border-none bg-purple-600 text-white px-1.5 py-0 text-[.4rem] custom__button'>HD</button>
                        </div>
                        <button onClick={() => addToFavorites(movie.id.toString(), mediaType)} className='transition-all hover:bg-amber-400 flex justify-center items-center border-solid border-x border-y border-amber-400 rounded-3xl w-6 h-6'>
                            {userFavorites?.includes(`${movie?.id} ${mediaType}`) ? <CheckIcon className='custom__icon transition-all hover:text-white text-amber-40 w-4 h-4' /> : <BookmarkIcon className='custom__icon transition-all hover:text-white text-amber-400 fill-amber-400 w-4 h-4' />}
                        </button>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <StarRating initialValue={props.movie?.vote_average!} size={"xtrasmall"} id={'l'} />
                        <p className='subtitle cursor-default text-xs'>({props.movie?.vote_count})</p>
                        <p className='subtitle cursor-default max-w-[10ch] text-xs'>{movie.genres[0].name}</p>
                        <p className='subtitle cursor-default text-xs'>{props.movie?.release_date?.slice(0, 4)}</p>
                    </div>
                    <p className='subtitle cursor-default text-start max-w-[25ch] text-sm'>
                        {props.movie?.overview?.slice(0, 200)}...
                    </p>
                    <p className='text-white font-semibold cursor-default'>Director: <span className='subtitle cursor-default text-xs'>{director?.name}</span></p>
                    <p className='text-white font-semibold cursor-default'>Genres: <span className='subtitle cursor-default text-xs'>{movie.genres?.map((genre) => <span key={genre.id}>{genre.name} </span>)}</span></p>
                    <p className='text-white font-semibold cursor-default'>Cast: <span className='subtitle cursor-default text-xs'>{cast?.map((person) => <p key={person.id}>{person.name} </p>)}</span></p>
                </div>
                <img className='transition-all opacity-50 blur-sm cursor-pointer rounded-3xl h-96 w-64 absolute' src={`https://image.tmdb.org/t/p/original${props.movie?.poster_path}`} alt={`${props.movie?.title}`} />
            </div>}
            <h3 className='paragraph capitalize cursor-default mb-5'>{props.movie?.title ? props.movie?.title : props.movie?.name}</h3>
        </div >
    )
}
