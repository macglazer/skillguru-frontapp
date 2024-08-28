import StarSvg from "@icons/StarSvg";
import React from "react";

type Props = {
  className?: string;
  rate?: number;
  size?: string;
  total?: number;
};

export const Stars = ({
  size = "1em",
  rate = 0,
  total = 5,
  className,
}: Props) => {
  const starArray = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className={className}>
      {starArray.map((star, index) => (
        <StarSvg key={index} filled={true} color={star <= rate ? '#FFC728' : '#FFF2CC'} />
      ))}
    </div>
  );
};
