import { supabase } from '../../../utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })

  const token = Math.random().toString(36).slice(2, 12)
  await supabase.from('review_verifications').insert({ email, token })

  const link = `${process.env.APP_URL}/reviews?token=${token}`
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Confirm your review',
    html: `Click <a href="${link}">here</a> to leave your review.`,
  })

  res.status(200).json({ success: true })
}