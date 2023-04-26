import React, { useEffect, useState } from 'react';
import { NavBar } from '../main/components';
import { Header, Providers, Cast, Reviews } from './components';
import { Movie, MovieDetails, RatingMovieData, UserFavorites } from '../../interfaces/interfaces';
import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useParams, useLocation } from 'react-router-dom';
import { key } from '../main/constants/requests';
import { options } from './api/apiData';
import axios from 'axios';

import { Info, Media } from './containers';


export type IMovieProps = {
}

const Movie: React.FC<IMovieProps> = (props) => {

    const [movie, setMovie] = useState<Movie | null>(null)
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
    const [trailerKey, setTrailerKey] = useState<string | null>(null)
    const [ratingMovieData, setRatingMovieData] = useState<RatingMovieData | null>(null);
    const [userFavorites, setUserFavorites] = useState<string[]>()

    const movieId = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mediaType = searchParams.get('mediatype');
    const id = movieId.id
    const auth = getAuth()
    const user = auth.currentUser

    useEffect(() => {
        async function fetchData() {
            try {
                const movieResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${key}&append_to_response=watch/providers,reviews`)
                const data: Movie = await movieResponse.json()

                setMovie(data)

                const mediaRequestType = data.name ? "show" : "movie"

                const options = {
                    method: 'GET',
                    url: 'https://mdblist.p.rapidapi.com/',
                    params: { tm: `${id}`, m: `${mediaRequestType}` },
                    headers: {
                        'X-RapidAPI-Key': '8463b6e131msh88790a275d6c7abp1bf763jsndf6af155901a',
                        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
                    }
                };

                await axios.request(options).then(function (response) {
                    setRatingMovieData(response.data)
                }).catch(function (error) {
                    console.error(error);
                });

                if (!user) {
                    return <div>Not logged in.</div>
                }

                const userId = user.uid;
                const userFavoritesRef = doc(collection(getFirestore(), 'user'), userId);

                onSnapshot(userFavoritesRef, (snapshot) => {
                    const userFavoritesData = snapshot.data() as UserFavorites;
                    setUserFavorites(userFavoritesData.favorites);
                });

                axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${key}&language=en-US`)
                    .then(response => {
                        const videos = response.data.results.filter((video: any) => video.type === 'Trailer');
                        if (videos.length > 0) {
                            setTrailerKey(videos[0].key);
                        }
                    })
                    .catch(error => console.error(error));

                async function fetchMovieDetails() {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${key}&append_to_response=credits`
                    );

                    setMovieDetails(response.data);
                }

                fetchMovieDetails();

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [id, options, key, movieId])

    if (!ratingMovieData) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>User not logged in.</div>
    }

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div>
            <div className='flex flex-col bg-[#141414] w-full h-20' >
                <NavBar authed={user.isAnonymous ? false : true} />
            </div>
            <div className='p-4'>
                <Header movie={movie} />
                <div className='w-full flex flex-row'>
                    <div className='w-1/2'>
                        <Info movie={movie} />
                    </div>
                    <div className='w-full'>
                        <Media movie={movie} userFavorites={userFavorites} mediaType={mediaType} trailerKey={trailerKey} ratingData={ratingMovieData} />
                    </div>
                </div>
                <div className='flex flex-row w-full mt-8 justify-start gap-8 border-t border-zinc-500 pt-8'>
                    <div className='flex flex-row justify-between gap-12'>
                        <Providers movie={movie} />
                        <Cast movieDetails={movieDetails} />
                        <Reviews reviews={movie.reviews} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Movie };