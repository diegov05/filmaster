import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { ReviewResults } from "../../../../interfaces/interfaces";
import { AddReviewButton, review } from "../AddReviewButton/AddReviewButton";
import { collection, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";

export type IReviewsProps = {
  reviews: ReviewResults | undefined;
};

const Reviews: React.FC<IReviewsProps> = (props) => {

  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mediaType = searchParams.get("mediatype");

  const movieId = params.id

  const [localReviews, setLocalReviews] = useState<review[] | null | undefined>(null);

  const db = getFirestore();
  const reviewsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const querySnapshot = await getDocs(reviewsCollectionRef);
        const fetchedReviews: review[] = [];

        querySnapshot.forEach((doc) => {
          const reviewData = doc.data() as review;
          fetchedReviews.push(reviewData);
        });

        setLocalReviews(fetchedReviews.filter((review) => review.movieId === movieId && review.mediaType === mediaType));

      } catch (error) {
        console.error("Error fetching reviews data:", error);
      }
    };

    fetchReviewsData();
  }, []);

  if (!props.reviews) {
    return <div>Reviews not fetched.</div>;
  }

  const reviews = props.reviews.results;

  if (!reviews) {
    return <div>Reviews not loaded.</div>;
  }

  if (!localReviews) {
    return <div>Reviews not loaded.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="subtitle text-xl uppercase tracking-widest">Reviews</h1>
      <div className="flex flex-col gap-4">
        {localReviews.map((review) => (
          <div key={review.movieId} className="flex flex-col gap-2">
            <div className="flex flex-row justify-start items-center gap-2">
              <h2 className="paragraph font-bold text-sm">{review.userName}</h2>
              <h2 className="subtitle text-sm">
                {review.date}
              </h2>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center">
              <StarIcon className="w-4 fill-violet-400" />
              <span className="text-sm headtext">
                {review.reviewRating}
              </span>
              <span className="headtext text-xs font-extralight">/ 10</span>
            </div>
            <p className="paragraph text-sm font-light max-w-sm">
              {review.reviewContent.slice(0, 200)}...
            </p>
          </div>
        ))}
        {reviews.slice(0, 4).map((review) => (
          <div key={review.id} className="flex flex-col gap-2">
            <div className="flex flex-row justify-start items-center gap-2">
              <h2 className="paragraph font-bold text-sm">{review.author}</h2>
              <h2 className="subtitle text-sm">
                {review.created_at.slice(0, 10)}
              </h2>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center">
              <StarIcon className="w-4 fill-violet-400" />
              <span className="text-sm headtext">
                {review.author_details.rating?.toString().slice(0, 3)}
              </span>
              <span className="headtext text-xs font-extralight">/ 10</span>
            </div>
            <p className="paragraph text-sm font-light max-w-sm">
              {review.content.slice(0, 200)}...
            </p>
          </div>
        ))}
        <AddReviewButton />
      </div>
    </div>
  );
};

export { Reviews };
