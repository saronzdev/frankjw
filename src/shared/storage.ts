import { api } from './utils'
import { getErrorCode } from './fetching'

const PUBLIC_PATH_MARKER = '/storage/v1/object/public/'

export const uploadImage = async (file: File): Promise<string | { error: number }> => {
  try {
    const buffer = await file.arrayBuffer()
    const { data } = await api.post<{ url: string }>('uploads', buffer, {
      headers: { 'Content-Type': file.type }
    })
    return data.url
  } catch (error: unknown) {
    return { error: getErrorCode(error) }
  }
}

export const deleteImage = async (url: string): Promise<{ ok: true; error: null } | { ok: false; error: number }> => {
  try {
    await api.delete('uploads', { params: { url } })
    return { ok: true, error: null }
  } catch (error: unknown) {
    return { ok: false, error: getErrorCode(error) }
  }
}

export const isStorageUrl = (url: string): boolean => url.includes(PUBLIC_PATH_MARKER)
