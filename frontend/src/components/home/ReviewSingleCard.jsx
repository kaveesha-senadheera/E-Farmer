import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa"; // Changed to leaf icon for e-farmer theme
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import ReviewModal from "./ReviewModal"; // Updated to use review modal

const ReviewSingleCard = ({ review }) => {
  // Changed from entry to review
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2 border-green-300 rounded-2xl px-6 py-5 m-4 relative bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-green-400">
      {/* Card Header with Name and Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full text-lg shadow-sm">
            {review.name}
          </h2>
          <div className="flex text-yellow-400">
            {Array(review.rating).fill("★").join("")}
            <span className="ml-1 text-gray-500 text-sm">
              ({review.rating}/5)
            </span>
          </div>
        </div>
        <FaLeaf className="text-green-600 text-2xl animate-pulse" />
      </div>

      {/* Photo Display */}
      <div className="mb-5">
        {review.photo ? (
          <img
            src={`../public/images/${review.photo}`} // Updated path
            alt={`${review.name}'s review`}
            className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 italic shadow-inner">
            No Photo Available
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-x-2">
          <BiUserCircle className="text-green-600 text-2xl" />
          <p className="text-gray-700 text-sm truncate">{review.email}</p>
        </div>
        <div className="flex items-start gap-x-2">
          <span className="text-green-600 text-xl">💬</span>
          <p className="text-gray-800 text-sm line-clamp-2">
            {review.reviewText}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-x-5 mt-6 p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <BiShow
          className="text-2xl text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-200"
          onClick={() => setShowModal(true)}
          title="View Details"
        />
        <Link to={`/reviews/details/${review._id}`}>
          <BsInfoCircle
            className="text-2xl text-green-600 hover:text-green-800 transition-colors duration-200"
            title="More Info"
          />
        </Link>
        <Link to={`/reviews/edit/${review._id}`}>
          <AiOutlineEdit
            className="text-2xl text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
            title="Edit"
          />
        </Link>
        <Link to={`/reviews/delete/${review._id}`}>
          <MdOutlineDelete
            className="text-2xl text-red-600 hover:text-red-800 transition-colors duration-200"
            title="Delete"
          />
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <ReviewModal review={review} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ReviewSingleCard;
