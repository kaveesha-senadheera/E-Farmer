/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaLeaf, FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const keys = ["name", "reviewText"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/reviews")
      .then((response) => {
        setReviews(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Footer Component
  const Footer = () => (
    <footer className="footer bg-green-800 text-white p-10">
      <div className="max-w-7xl mx-auto flex justify-between items-start flex-wrap gap-8">
        <div className="contact-info">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <div className="social-media">
            <a href="#" className="social-media-link">
              <FaInstagram className="social-media-icons" />
            </a>
            <a href="#" className="social-media-link">
              <FaFacebookF className="social-media-icons" />
            </a>
            <a href="#" className="social-media-link">
              <FaWhatsapp className="social-media-icons" />
            </a>
          </div>
          <p className="mt-4">Tel: 0765455918 / 0701025649</p>
        </div>
        <div className="footer-links">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/deliverys/create" className="footer-link">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Events
              </Link>
            </li>
            <li>
              <Link to="/feedbacks/full" className="footer-link">
                Support
              </Link>
            </li>
            <li>
              <Link to="/records" className="footer-link">
                Return & Refunds
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">E Farmer</h1>
          <div className="legal-links">
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="#" className="footer-link">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  Privacy Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="powered-by w-full text-center mt-6">
          <p>
            © {new Date().getFullYear()} E-Farmer. Powered by 100% renewable
            electricity 🌿
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex flex-col">
      {/* Header (Unchanged) */}
      <header className="p-6 bg-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
            <FaLeaf className="text-green-200" /> E-Farmer Reviews
          </h1>
          <div className="flex items-center gap-6">
            <Link to="/reviews/admin">
              <button className="bg-white text-green-700 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-100 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <span>Admin Dashboard</span>
                <BsInfoCircle className="text-xl" />
              </button>
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full border-2 border-white">
                  <img
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-gray-700"
              >
                <li>
                  <a className="justify-between">
                    Profile <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="hero min-h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/031/696/054/non_2x/sprawling-agricultural-farm-featuring-fields-of-crops-ai-generated-photo.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-50 bg-black"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Share Your Farming Experience
            </h1>
            <p className="mb-8 text-lg md:text-xl text-green-100 drop-shadow-md">
              Rate and review our e-farmer services. Your feedback helps us grow
              greener and stronger together! 🌱✨
            </p>
            <Link to="/reviews/create">
              <button className="btn bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                Add Your Review
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Rate Our Service",
            desc: "Give us your honest rating from 1 to 5 stars.",
            img: "https://i.pinimg.com/736x/d1/42/d8/d142d8b7a2e493ab8e6523ec42a5c420.jpg",
          },
          {
            title: "Share Your Story",
            desc: "Tell us about your experience with our platform.",
            img: "https://wallpapers.com/images/featured/farmer-background-9g13j407zo8u5wf3.jpg",
          },
          {
            title: "Upload Photos",
            desc: "Show off your farming moments with us.",
            img: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=2070&auto=format&fit=crop",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="card bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <figure>
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-56 object-cover"
              />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-semibold text-green-800">
                {card.title}
              </h2>
              <p className="text-gray-600">{card.desc}</p>
              <div className="card-actions justify-end mt-4">
                <Link to="/reviews/create">
                  <button className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 flex-grow">
        <div className="form-control mb-8 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search reviews by name or text..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full bg-white shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none py-3 px-4 rounded-full transition-all duration-200"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-4 text-left rounded-tl-xl">No</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left hidden md:table-cell">Email</th>
                  <th className="p-4 text-left">Rating</th>
                  <th className="p-4 text-left">Review</th>
                  <th className="p-4 text-left hidden md:table-cell">Photo</th>
                  <th className="p-4 text-left rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search(reviews).map((review, index) => (
                  <tr
                    key={review._id}
                    className="even:bg-gray-50 hover:bg-green-50 transition-colors duration-200"
                  >
                    <td className="p-4 text-gray-700">{index + 1}</td>
                    <td className="p-4 text-gray-800 font-medium">
                      {review.name}
                    </td>
                    <td className="p-4 text-gray-700 hidden md:table-cell">
                      {review.email}
                    </td>
                    <td className="p-4 text-gray-700">
                      <span className="text-yellow-400">
                        {Array(review.rating).fill("★").join("")}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 max-w-xs truncate">
                      {review.reviewText}
                    </td>
                    <td className="p-4 text-gray-700 hidden md:table-cell">
                      {review.photo ? (
                        <img
                          src={`../public/images/${review.photo}`}
                          alt={`${review.name}'s review`}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        "No photo"
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-x-4">
                        <Link to={`/reviews/details/${review._id}`}>
                          <BsInfoCircle className="text-2xl text-green-600 hover:text-green-800" />
                        </Link>
                        <Link to={`/reviews/edit/${review._id}`}>
                          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-800" />
                        </Link>
                        <Link to={`/reviews/delete/${review._id}`}>
                          <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-800" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
