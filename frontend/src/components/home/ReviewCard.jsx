import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa"; // Changed to a leaf icon for e-farmer theme
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ReviewSingleCard from "./ReviewSingleCard"; // Updated component name

const ReviewCard = ({ reviews }) => {
  // Changed from entries to reviews
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {reviews.map((item) => (
        <ReviewSingleCard key={item._id} review={item} /> // Changed prop from entry to review
      ))}
    </div>
  );
};

export default ReviewCard;
