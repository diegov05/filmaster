import React from 'react';
import { Rating, Resources, AddFavoritesButton } from '../../components';
import { Movie, RatingMovieData, UserFavorites } from '../../../../interfaces/interfaces';

export type IMediaProps = {
    userFavorites: UserFavorites
    mediaType: string
    movie: Movie
    trailerKey: string
    ratingData: RatingMovieData
}

const Media: React.FC<IMediaProps> = (props) => {

    const { movie, userFavorites, mediaType, trailerKey, ratingData } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div>
            <Resources movie={movie} trailerKey={trailerKey} />
            <Rating ratingData={ratingData} />
            <AddFavoritesButton movie={movie} mediaType={mediaType} userFavorites={userFavorites} />
        </div>
    );
}

export { Media };