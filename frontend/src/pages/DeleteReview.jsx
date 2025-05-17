import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteReview = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/reviews/${id}`) // Updated endpoint
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
        navigate("/"); // Assuming this navigates back to the admin page
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error Deleting Review", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-md mx-auto">
        <BackButton />

        {/* Header */}
        <h1 className="text-3xl font-bold text-green-900 mt-6 mb-8 text-center">
          Delete Review
        </h1>

        {loading && <Spinner />}

        {/* Confirmation Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Are you sure you want to delete this review?
          </h3>

          {/* Warning Icon */}
          <div className="text-red-500 text-4xl mb-6">⚠️</div>

          {/* Buttons */}
          <div className="flex gap-4 w-full">
            <button
              className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md"
              onClick={handleDeleteReview}
            >
              Yes, Delete It
            </button>
            <button
              className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReview;
