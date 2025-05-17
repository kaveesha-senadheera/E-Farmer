import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveReview = () => {
    // Validation
    if (!/^[A-Za-z\s]+$/.test(name)) {
      enqueueSnackbar("Please enter letters only for Name", {
        variant: "error",
      });
      return;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      enqueueSnackbar("Please enter a valid email address", {
        variant: "error",
      });
      return;
    }
    if (rating === 0) {
      enqueueSnackbar("Please select a rating", { variant: "error" });
      return;
    }
    if (reviewText.trim().length < 10) {
      enqueueSnackbar("Review must be at least 10 characters long", {
        variant: "error",
      });
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("rating", rating);
    data.append("reviewText", reviewText);
    if (photo) data.append("photo", photo);

    setLoading(true);
    axios
      .post("http://localhost:5000/reviews", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Submitted Successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error submitting review", { variant: "error" });
        console.log(error);
      });
  };

  const StarRating = () => {
    return (
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <BackButton />
      <h1 className="text-4xl font-bold text-center my-6 text-green-800">
        Share Your E-Farmer Experience
      </h1>

      {loading && <Spinner />}

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Farmer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Rate Your Experience
            </label>
            <StarRating />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Tell us about your experience with E-Farmer..."
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Add a Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full p-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSaveReview}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
