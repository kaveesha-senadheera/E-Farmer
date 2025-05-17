import { AiOutlineClose } from 'react-icons/ai';
import { MdEmail } from "react-icons/md";
import { BiUserCircle } from 'react-icons/bi';
import { FaStar } from "react-icons/fa"; // New icon for rating
import { BsChatText } from "react-icons/bs"; // New icon for review text
import { MdAttachFile } from "react-icons/md"; // Kept for photo

// eslint-disable-next-line react/prop-types
const ReviewModal = ({ review, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[700px] max-w-full max-h-[90vh] bg-white rounded-2xl p-6 flex flex-col relative shadow-2xl overflow-y-auto'
      >
        {/* Close Button */}
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 hover:text-red-800 cursor-pointer transition-colors duration-200'
          onClick={onClose}
        />

        {/* ID Header */}
        <h2 className='w-fit px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full mb-4'>
          Review #{review._id.slice(-6)} {/* Show last 6 chars of ID for brevity */}
        </h2>

        {/* Content */}
        <div className="space-y-5">
          {/* Name */}
          <div className='flex items-center gap-x-3'>
            <BiUserCircle className='text-green-600 text-3xl' />
            <div className="flex-1">
              <span className="text-gray-600 font-medium">Farmer Name</span>
              <p className='text-lg text-gray-800 font-semibold'>{review.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className='flex items-center gap-x-3'>
            <MdEmail className='text-green-600 text-3xl' />
            <div className="flex-1">
              <span className="text-gray-600 font-medium">Email</span>
              <p className='text-lg text-gray-800'>{review.email}</p>
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-x-3'>
            <FaStar className='text-green-600 text-3xl' />
            <div className="flex-1">
              <span className="text-gray-600 font-medium">Rating</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({review.rating}/5)</span>
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div className='flex items-start gap-x-3'>
            <BsChatText className='text-green-600 text-3xl' />
            <div className="flex-1">
              <span className="text-gray-600 font-medium">Review</span>
              <p className='text-gray-800 leading-relaxed'>{review.reviewText}</p>
            </div>
          </div>

          {/* Photo */}
          <div className='flex items-start gap-x-3'>
            <MdAttachFile className='text-green-600 text-3xl' />
            <div className="flex-1">
              <span className="text-gray-600 font-medium">Photo</span>
              {review.photo ? (
                <img
                  src={`../public/images/${review.photo}`}
                  alt={`${review.name}'s review`}
                  className="mt-2 w-full max-w-sm h-auto rounded-lg shadow-md"
                />
              ) : (
                <p className='text-gray-500 italic mt-1'>No photo attached</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;