import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa"; // Kept download icon
import { useState } from "react";
import ReviewPDF from "./ReviewPDF"; // Updated to use review PDF component
import { PDFDownloadLink } from "@react-pdf/renderer";

const ReviewTable = ({ reviews }) => {
  // Changed from entries to reviews
  const [query, setQuery] = useState("");
  const keys = ["name", "reviewText"]; // Updated search keys for reviews

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <div className="mt-6">
      {/* Search Input */}
      <div className="form-control mb-6 w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search by name or review text..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full bg-white shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none py-3 px-4 rounded-full transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-xl bg-white">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border-b border-green-700 rounded-tl-xl p-4 text-left text-sm font-semibold">
                No
              </th>
              <th className="border-b border-green-700 p-4 text-left text-sm font-semibold">
                Name
              </th>
              <th className="border-b border-green-700 p-4 text-left text-sm font-semibold hidden md:table-cell">
                Email
              </th>
              <th className="border-b border-green-700 p-4 text-left text-sm font-semibold">
                Rating
              </th>
              <th className="border-b border-green-700 p-4 text-left text-sm font-semibold">
                Review
              </th>
              <th className="border-b border-green-700 p-4 text-left text-sm font-semibold hidden md:table-cell">
                Photo
              </th>
              <th className="border-b border-green-700 rounded-tr-xl p-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {search(reviews).map((review, index) => (
              <tr
                key={review._id}
                className="h-14 even:bg-gray-50 hover:bg-green-50 transition-colors duration-200"
              >
                <td className="border-b border-gray-200 p-4 text-gray-700">
                  {index + 1}
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-800 font-medium">
                  {review.name}
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-700 hidden md:table-cell">
                  {review.email}
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-700">
                  <div className="flex items-center">
                    {Array(review.rating).fill("★").join("")}
                    <span className="ml-1 text-gray-600">
                      ({review.rating})
                    </span>
                  </div>
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-700 max-w-xs truncate">
                  {review.reviewText}
                </td>
                <td className="border-b border-gray-200 p-4 text-gray-700 hidden md:table-cell">
                  {review.photo ? (
                    <img
                      src={`../public/images/${review.photo}`}
                      alt="Review photo"
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                    />
                  ) : (
                    "No photo"
                  )}
                </td>
                <td className="border-b border-gray-200 p-4">
                  <div className="flex justify-start items-center gap-x-4">
                    <Link to={`/reviews/details/${review._id}`}>
                      <BsInfoCircle
                        className="text-2xl text-green-600 hover:text-green-800 transition-colors duration-200"
                        title="Details"
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
                    <PDFDownloadLink
                      document={<ReviewPDF review={review} />}
                      fileName={`Review_${review.name}.pdf`}
                    >
                      {({ loading }) =>
                        loading ? (
                          <span className="text-sm text-gray-500">
                            Loading...
                          </span>
                        ) : (
                          <FaFileDownload
                            className="text-2xl text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            title="Download PDF"
                          />
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewTable;
