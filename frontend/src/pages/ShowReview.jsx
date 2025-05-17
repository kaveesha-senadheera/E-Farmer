import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowReview = () => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/reviews/${id}`) // Updated endpoint
      .then((response) => {
        setReview(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-2xl ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto">
        <BackButton />

        {/* Header */}
        <h1 className="text-4xl font-bold text-green-800 text-center my-8">
          Review Details
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* ID */}
            <div className="flex items-center border-b pb-4">
              <span className="text-lg font-medium text-gray-600 w-32">ID</span>
              <span className="text-gray-800">{review._id}</span>
            </div>

            {/* Name */}
            <div className="flex items-center border-b pb-4">
              <span className="text-lg font-medium text-gray-600 w-32">
                Name
              </span>
              <span className="text-gray-800 font-semibold">{review.name}</span>
            </div>

            {/* Email */}
            <div className="flex items-center border-b pb-4">
              <span className="text-lg font-medium text-gray-600 w-32">
                Email
              </span>
              <span className="text-gray-800">{review.email}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center border-b pb-4">
              <span className="text-lg font-medium text-gray-600 w-32">
                Rating
              </span>
              <StarRating rating={review.rating} />
              <span className="ml-2 text-gray-600">({review.rating}/5)</span>
            </div>

            {/* Review Text */}
            <div className="flex flex-col border-b pb-4">
              <span className="text-lg font-medium text-gray-600 mb-2">
                Review
              </span>
              <p className="text-gray-800 leading-relaxed">
                {review.reviewText}
              </p>
            </div>

            {/* Photo */}
            <div className="flex flex-col border-b pb-4">
              <span className="text-lg font-medium text-gray-600 mb-2">
                Photo
              </span>
              {review.photo ? (
                <img
                  src={`../public/images/${review.photo}`}
                  alt="Review"
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
              ) : (
                <span className="text-gray-500 italic">No photo uploaded</span>
              )}
            </div>

            {/* Timestamps */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-600 w-32">
                  Created
                </span>
                <span className="text-gray-700">
                  {new Date(review.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-600 w-32">
                  Updated
                </span>
                <span className="text-gray-700">
                  {new Date(review.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowReview;
