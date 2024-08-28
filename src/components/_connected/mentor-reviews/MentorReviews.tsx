import { type Review as ReviewType } from "@customTypes/mentor";

import React, { useCallback, useEffect, useState } from "react";
import { fetchMentorReviews } from "src/services/mentor/fetchMentorServices.service";
import {Review, Reviews, ReviewSkeleton} from "../../_grouped/reviews";
import {Pagination} from "../../_grouped";

type Props = {
  mentorId: string;
};

const REVIEWS_PER_PAGE = 3;

/**
 * Mentor reviews Connected
 */
export const MentorReviewsConnected = ({ mentorId }: Props) => {
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [avg, setAvg] = useState<number>(0);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const run = async (page: number) => {
      setPending(true);
      // setReviews([]);
      setError("");
      try {
        const { total, reviews, avgRate } = await fetchMentorReviews({
          mentorId: String(mentorId),
          take: 3,
          skip: (page - 1) * REVIEWS_PER_PAGE,
        });
        setAvg(avgRate)
        setTotal(total);
        setReviews(reviews.slice(0, REVIEWS_PER_PAGE));
      } catch (e) {
        setError("Nie udało się pobrać ocen mentora.");
        setTotal(0);
      }
      setPending(false);
    };
    run(page);
  }, [mentorId, page]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    setPage(Number(value));
  }, []);

  return (
    <Reviews avgRate={avg} title="Opinie" total={total}>
      {!pending && reviews.length === 0 ? (
        <Reviews.Message>
          Ten mentor nie otrzymał na razie żadnych ocen.
        </Reviews.Message>
      ) : null}
      <Reviews.List>
        {pending
          ? new Array(3).fill(null).map((_,ind) => <ReviewSkeleton key={ind} />)
          : reviews.map((r) => {
              return <Review key={r.id} review={r} />;
            })}
      </Reviews.List>
      {total ? (
        <Reviews.Footer>
          <Pagination
            current={page}
            last={Math.ceil(total / REVIEWS_PER_PAGE)}
            onClick={handleClick}
          />
        </Reviews.Footer>
      ) : null}
    </Reviews>
  );
};
