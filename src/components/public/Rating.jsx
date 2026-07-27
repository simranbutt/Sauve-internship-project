import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './Rating.css'
import AuthModal from './AuthModal';
export function Rating() {
   const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);


  return (
    
    <div className="rating-container">
      <p className="rate-line">Rate this post</p>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <FaStar key={starNumber}
           onClick={()=>setRating(starNumber)}
           className={starNumber<=rating ? "star-active":"star"}
          />
        ))}
      </div>

      <button className={rating>0 ? "rating-btn":"nocolor-rating-btn"} >Submit
      </button>
    </div>
  );
}

export default Rating;