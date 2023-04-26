import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { Review } from '../../../../interfaces/interfaces';

export type IReviewsProps = {
    reviews: Review[]
}

const Reviews: React.FC<IReviewsProps> = (props) => {

    const reviews = props.reviews

    if (!reviews) {
        return <div>Reviews not loaded.</div>
    }

    return (
        <div className='flex flex-col gap-2 '>
            <h1 className='subtitle text-xl uppercase tracking-widest'>Reviews</h1>
            <div className='flex flex-col gap-4'>
                {reviews.slice(0, 4).map((review) => (
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
    );
}

export { Reviews };