import React from 'react';
import { Movie, Provider } from '../../../../interfaces/interfaces';

export type IProvidersProps = {
    movie: Movie | null
}

const Providers: React.FC<IProvidersProps> = (props) => {

    const { movie } = props

    //@ts-expect-error
    const providers = movie["watch/providers"].results["US"] === undefined ? null : movie["watch/providers"].results;

    const streamingProviders = providers !== null ? providers["US"].flatrate ? providers["US"].flatrate : providers["US"].buy : null;

    const sortedProviders = streamingProviders !== null ? [...streamingProviders].sort(
        (a, b) => a.display_priority - b.display_priority
    ) : null;

    if (!sortedProviders) {
        return <div>Providers not fetched.</div>
    }

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='subtitle text-xl uppercase tracking-widest'>Where to Watch</h1>
            {sortedProviders.map((provider: Provider) => (
                <div key={provider.provider_id} className='bg-[#212121] p-4 flex justify-start items-center flex-row gap-2 cursor-pointer hover:bg-zinc-900 transition-all'>
                    <img className='w-10' src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt="" />
                    <h2 className='paragraph'>{provider.provider_name}</h2>
                </div>
            ))}
        </div>
    );
}

export { Providers };