// pages/reviews.tsx
import { useState, useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'

type ApiReview = {
  id: number
  name: string
  text: string
  created_at: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ApiReview[]>([])
  const [name, setName]       = useState('')
  const [text, setText]       = useState('')
  const [refresh, setRefresh] = useState(0)

  // load (or reload) reviews
  useEffect(() => {
    fetch('/api/reviews/list')
      .then(r => r.json())
      .then(d => setReviews(d.reviews))
  }, [refresh])

  const submitReview = async () => {
    if (!name || !text) { 
      alert('Please enter your name and review'); 
      return 
    }
    const res = await fetch('/api/reviews/submit', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, text }),
    })
    if (res.ok) {
      setName('')
      setText('')
      setRefresh((r) => r + 1)  // reload the list
    } else {
      const { error } = await res.json()
      alert(error || 'Error submitting review')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600 mb-8">
          No reviews yet. Be the first to leave one!
        </p>
      ) : (
        <div className="space-y-4 mb-8">
          {reviews.map((r) => (
            <ReviewCard key={r.id} name={r.name} content={r.text} />
          ))}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full mb-3 border rounded px-3 py-2"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your review"
          className="w-full mb-3 border rounded px-3 py-2 h-24"
        />
        <button
          onClick={submitReview}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  )
}