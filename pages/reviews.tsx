// pages/reviews.tsx
import { useState, useEffect } from 'react'
import { useRouter }     from 'next/router'
import ReviewCard        from '../components/ReviewCard'

type ApiReview = {
  id: number
  name: string
  text: string
  created_at: string
}

export default function ReviewsPage() {
  const router = useRouter()
  const { token } = router.query as { token?: string }

  const [reviews, setReviews] = useState<ApiReview[]>([])
  const [step,    setStep]    = useState<'start'|'sent'|'form'|'done'>('start')
  const [email,   setEmail]   = useState('')
  const [name,    setName]    = useState('')
  const [text,    setText]    = useState('')

  // 1) load existing reviews
  useEffect(() => {
    fetch('/api/reviews/list')
      .then(r => r.json())
      .then(d => setReviews(d.reviews))
  }, [])

  // 2) if we have ?token=… verify it
  useEffect(() => {
    if (token && step === 'start') {
      fetch(`/api/reviews/verify?token=${token}`)
        .then(r => r.json())
        .then(d => {
          if (d.valid) setStep('form')
          else          alert('Confirmation link invalid or already used.')
        })
    }
  }, [token, step])

  const sendVerification = async () => {
    if (!email) return alert('Please enter your email')
    await fetch('/api/reviews/send-verification', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    })
    setStep('sent')
  }

  const submitReview = async () => {
    if (!name || !text || !token) return alert('Name, review text, and valid link required')
    await fetch('/api/reviews/submit', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, text, token })
    })
    setStep('done')
    // reload list
    const d = await fetch('/api/reviews/list').then(r => r.json())
    setReviews(d.reviews)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Reviews</h1>

      {/* Existing reviews */}
      {reviews.length > 0 && (
        <div className="space-y-4 mb-8">
          {reviews.map(r => (
            <ReviewCard 
              key={r.id} 
              name={r.name} 
              content={r.text} 
            />
          ))}
        </div>
      )}

      {/* No reviews yet, start email flow */}
      {reviews.length === 0 && step === 'start' && (
        <div className="text-center py-12">
          <p className="mb-4 text-gray-600">
            No reviews yet. Be the first to leave one!
          </p>
          <div className="flex justify-center gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="border rounded px-3 py-2"
            />
            <button
              onClick={sendVerification}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Leave a review
            </button>
          </div>
        </div>
      )}

      {/* Verification sent */}
      {step === 'sent' && (
        <p className="text-center text-gray-600">
          Check your inbox for a confirmation link. Then come back here.
        </p>
      )}

      {/* Write review form */}
      {step === 'form' && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Write your review</h2>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full mb-3 border rounded px-3 py-2"
          />
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
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
      )}

      {/* Submission complete */}
      {step === 'done' && (
        <p className="text-center text-green-600 mt-6">
          Thank you! Your review is now live.
        </p>
      )}
    </div>
  )
}