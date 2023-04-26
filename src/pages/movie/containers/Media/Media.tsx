import React from 'react';
import { Rating, Resources, AddFavoritesButton } from '../../components';
import { Movie, RatingMovieData, UserFavorites } from '../../../../interfaces/interfaces';

export type IMediaProps = {
    userFavorites: string[] | undefined
    mediaType: string | null
    movie: Movie | null
    trailerKey: string | null
    ratingData: RatingMovieData
}

const Media: React.FC<IMediaProps> = (props) => {

    const { movie, userFavorites, mediaType, trailerKey, ratingData } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div>
            <div className='flex flex-col gap-6'>
                <Resources movie={movie} trailerKey={trailerKey} />
                <div className='flex flex-col gap-4'>
                    <Rating ratingData={ratingData} />
                    <AddFavoritesButton movie={movie} mediaType={mediaType} userFavorites={userFavorites} />
                </div>
            </div>
        </div>
    );
}

export { Media };