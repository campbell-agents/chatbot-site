import { supabase } from '../../../utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, text } = req.body
  if (!name || !text) return res.status(400).json({ error: 'Missing fields' })

  const { error } = await supabase.from('reviews').insert({ name, text })
  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ success: true })
}