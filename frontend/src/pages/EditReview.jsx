import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/reviews/${id}`) // Updated endpoint
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setRating(response.data.rating);
        setReviewText(response.data.reviewText);
        setPhoto(response.data.photo); // Store existing photo reference
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while fetching review data", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditReview = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("rating", rating);
    data.append("reviewText", reviewText);
    if (photo && typeof photo !== "string") data.append("photo", photo); // Only append if new file

    setLoading(true);
    axios
      .put(`http://localhost:5000/reviews/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Updated Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error Updating Review", { variant: "error" });
        console.log(error);
      });
  };

  const StarRating = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`text-3xl transition-colors ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto">
        <BackButton />

        {/* Header */}
        <h1 className="text-4xl font-bold text-green-800 text-center my-8">
          Edit Review
        </h1>

        {loading && <Spinner />}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Rating
            </label>
            <StarRating />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your review"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Photo (Optional)
            </label>
            {photo && typeof photo === "string" && (
              <div className="mb-4">
                <img
                  src={`../public/images/${reviewText.photo}`}
                  alt="Current review"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Current photo</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full p-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handleEditReview}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
          >
            Update Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
