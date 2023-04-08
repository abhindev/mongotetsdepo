import React from "react";
import styles from "../../../../styles/review.module.css";
import { CiStar } from "react-icons/ci";

import Avatar from "react-avatar";

function ReviewsContainer({ review }: any) {
  console.log(review);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Avatar name={review.username} size="50" round={true} />
        <div className={styles.textContainer}>
          <div className={styles.username}>
            <h2 className={styles.p}>{review.username}</h2>
          </div>
          <div className={styles.startContainer}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <CiStar key={i} color="red" />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.review}>
        <p>{review.review}</p>
      </div>
    </div>
  );
}

export default ReviewsContainer;
