import React from 'react'
import ReviewsContainer from "./review/ReviewsContainer"


function review({reviews} :any) {
    // console.log(reviews[0].username)
  return (
    <div>
      {reviews ? reviews.map((review:any, i:number) => 
        <div key={i}>
            <ReviewsContainer review={review} />
        </div>
      ): ""}
    </div>
  )
}

export default review
