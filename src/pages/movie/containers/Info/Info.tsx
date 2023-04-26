import React from 'react';
import { Header, Poster } from '../../components';
import { Movie } from '../../../../interfaces/interfaces';


export type IInfoProps = {
    movie: Movie
}

const Info: React.FC<IInfoProps> = (props) => {

    const { movie } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div>
            <Header movie={movie} />
            <Poster movie={movie} />
        </div>
    );
}

export { Info };