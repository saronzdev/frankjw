import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseToken = import.meta.env.VITE_SUPABASE_TOKEN as string

const supabase = createClient(supabaseUrl, supabaseToken)

export async function uploadFile(file: File): Promise<string | { error: string }> {
  const bucket = 'pictures'
  const date = Date.now().toString()
  const name = file.name
  const path = date + name
  const { error } = await supabase.storage.from(bucket).upload(path, file)
  if (error) return { error: error.cause as string }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  if (!data.publicUrl) return { error: 'Not Url' }
  return data.publicUrl
}
