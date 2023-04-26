import React from 'react';
import { CastMember, MovieDetails } from '../../../../interfaces/interfaces';

export type ICastProps = {
    movieDetails: MovieDetails
}

const Cast: React.FC<ICastProps> = (props) => {

    const movieDetails = props.movieDetails

    if (!movieDetails) {
        return <div>Movie data missing.</div>
    }

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='subtitle text-xl uppercase tracking-widest'>Cast</h1>
            <div className='flex flex-row gap-8'>
                <div className='flex flex-col gap-2'>
                    {movieDetails.credits.cast.slice(0, 3).map((castMember: CastMember) => (
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
                    {movieDetails.credits.cast.slice(3, 6).map((castMember) => (
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
    );
}

export { Cast };