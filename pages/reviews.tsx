// pages/reviews.tsx
import { useState } from 'react';
import ReviewCard from '@/components/ReviewCard';

type Review = { name: string; content: string; };

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);

  const reviews: Review[] = [
    { name: 'John D.', content: 'Very helpful service!' },
    // add more reviews here
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews yet.</div>
      ) : (
        <div className="space-y-4 mb-8">
          {reviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      )}

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Write a Review'}
      </button>

      {showForm && (
        <form className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Your review"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}