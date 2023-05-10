import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

import { v4 as uuid } from "uuid";

import "./AddReviewButton.css"

export type IAddReviewButtonProps = {
};

export type review = {
  reviewId: string
  userId: string | undefined;
  userName: string | null | undefined;
  date: string;
  movieId: string | undefined
  mediaType: string | null;
  reviewContent: string;
  reviewRating: number;
}


const AddReviewButton: React.FC<IAddReviewButtonProps> = (props) => {

  const user = useContext(AuthContext);

  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mediaType = searchParams.get("mediatype");

  const movieId = params.id

  let currentDate = new Date().toJSON().slice(0, 10);

  const [review, setReview] = useState<review>({ reviewId: "", userId: user?.uid, userName: user?.displayName ? user.displayName : user?.email, date: currentDate, movieId: movieId, mediaType: mediaType, reviewContent: "", reviewRating: 0 })

  const db = getFirestore()
  const reviewsCollectionRef = collection(db, 'reviews')

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const reviewContentInput = form.elements.namedItem("reviewContent") as HTMLInputElement;
    const reviewRatingInput = form.elements.namedItem("reviewRating") as HTMLInputElement;
    const reviewContent = reviewContentInput.value;
    const reviewRating = parseInt(reviewRatingInput.value, 10);

    setReview((prevReview) => ({
      ...prevReview,
      reviewContent,
      reviewRating,
    }));


    reviewContentInput.value = "";
    reviewRatingInput.value = "";

    const newReview = {
      reviewId: uuid(),
      userId: review.userId,
      userName: review.userName,
      date: review.date,
      movieId: review.movieId,
      mediaType: review.mediaType,
      reviewContent,
      reviewRating
    };

    try {
      await setDoc(doc(reviewsCollectionRef), newReview);
      console.log("Review added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding review to Firestore:", error);
    }
  }

  return (
    <form onSubmit={handleReviewSubmit} className="flex flex-row w-full">
      <input type="submit" className="cursor-pointer transition-all hover:opacity-90 headtext bg-amber-400 p-2 w-1/3" value={"POST"} />
      <input className="w-full p-2 bg-zinc-900 subtitle text-xs" type="text" required placeholder="Write a review..." name="reviewContent" />
      <span className="flex flex-row justify-center items-center gap-2 bg-purple-900 text-white">
        <input type="number" min={0} max={10} className="text-center bg-zinc-900/30 w-1/4" name="reviewRating" />
        <span className="headtext">/10</span>
      </span>
    </form>
  );
};

export { AddReviewButton };
