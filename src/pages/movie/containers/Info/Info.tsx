import React from 'react';
import { Header, Poster } from '../../components';
import { Movie } from '../../../../interfaces/interfaces';


export type IInfoProps = {
    movie: Movie | null
}

const Info: React.FC<IInfoProps> = (props) => {

    const { movie } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    return (
        <div className='flex flex-col'>
            <Poster movie={movie} />
        </div>
    );
}

export { Info };