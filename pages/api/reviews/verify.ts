import { supabase } from '../../../utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  const { data, error } = await supabase
    .from('review_verifications')
    .select('used')
    .eq('token', token)
    .single()

  if (error || !data || data.used) return res.status(400).json({ valid: false })

  await supabase
    .from('review_verifications')
    .update({ used: true })
    .eq('token', token)

  res.status(200).json({ valid: true })
}