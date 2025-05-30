import { useState } from "react";

export default function Reviews() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, just show a thank you message
    setSubmitted(true);
    setName("");
    setRating("5");
    setComment("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviews</h1>

      {submitted ? (
        <p>Thanks for your review!</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Name:<br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Rating:<br />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                style={{ width: "100%" }}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Okay</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Bad</option>
              </select>
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Comment:<br />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                style={{ width: "100%" }}
              />
            </label>
          </div>

          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
}
