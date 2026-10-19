import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseToken = import.meta.env.VITE_SUPABASE_TOKEN as string

const supabase = createClient(supabaseUrl, supabaseToken)

const BUCKET = 'pictures'
const PUBLIC_PATH_MARKER = '/storage/v1/object/public/'

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif'
}

function generateFileName(file: File): string | null {
  const extension = EXTENSION_BY_MIME[file.type]
  if (!extension) return null

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  return `${id}.${extension}`
}

export async function uploadFile(file: File): Promise<string | { error: string }> {
  const path = generateFileName(file)
  if (!path) return { error: 'Unsupported file type' }

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false })
  if (error) return { error: error.message }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  if (!data.publicUrl) return { error: 'Not Url' }
  return data.publicUrl
}

export async function deleteFile(url: string): Promise<{ ok: boolean; error?: string }> {
  const path = url.split(PUBLIC_PATH_MARKER)[1]
  if (!path) return { ok: false, error: 'Invalid file url' }

  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
