// pages/reviews.tsx
import ReviewCard from "../components/ReviewCard";

type Review = { name: string; content: string };

export default function ReviewsPage() {
  const reviews: Review[] = [
    { name: "John D.", content: "Very helpful service!" },
    // add more reviews here
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews yet.</div>
      ) : (
        <div className="space-y-4 mb-8">
          {reviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      )}
    </div>
  );
}