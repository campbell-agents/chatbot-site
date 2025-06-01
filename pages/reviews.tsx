import { useState } from 'react';
import ReviewCard from '@/components/ReviewCard';

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);

  // Replace this later with real reviews from a backend or JSON file
  const reviews = [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 mb-6">No reviews yet. Be the first to leave one!</div>
      ) : (
        <div className="space-y-4 mb-8">
          {reviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          {showForm ? 'Cancel' : 'Leave a Review'}
        </button>
      </div>

      {showForm && (
        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded-xl"
          />
          <select className="w-full border px-4 py-2 rounded-xl">
            <option value="">Rating</option>
            {[5, 4, 3, 2, 1].map((v) => (
              <option key={v} value={v}>
                {v} - {['Excellent', 'Good', 'Okay', 'Poor', 'Awful'][5 - v]}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Comment"
            className="w-full border px-4 py-2 rounded-xl"
          ></textarea>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}