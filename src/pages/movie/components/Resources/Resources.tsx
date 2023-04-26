import React from 'react';
import { Movie } from '../../../../interfaces/interfaces';

export type IResourcesProps = {
    trailerKey: string | null
    movie: Movie | null
}

const Resources: React.FC<IResourcesProps> = (props) => {

    const { movie, trailerKey } = props

    if (!movie) {
        return <div>Movie not fetched.</div>
    }

    if (!trailerKey) {
        return <div>Video not fetched.</div>
    }

    return (
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
    );
}

export { Resources };