import React from "react";

export type IAddReviewButtonProps = {};

const AddReviewButton: React.FC<IAddReviewButtonProps> = ({ }) => {
  return (
    <form className="flex flex-row w-full">
      <button className="w-1/2"></button>
      <input className="w-full" type="text" />
      <span className="text-white">/10</span>
    </form>
  );
};

export { AddReviewButton };
