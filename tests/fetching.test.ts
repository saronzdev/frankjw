import { afterEach, describe, expect, it, vi } from 'vitest'
import { api } from '@/shared/utils'
import { getProductsSignals } from '@/shared/fetching'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('getProductsSignals', () => {
  it('usa la URL normal en una carga habitual para aprovechar la caché pública', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ data: [] } as never)
    await getProductsSignals()
    expect(spy).toHaveBeenCalledWith('products', undefined)
  })

  it('añade un parámetro único al pedir datos frescos y esquiva la caché', async () => {
    const spy = vi.spyOn(api, 'get').mockResolvedValue({ data: [] } as never)
    await getProductsSignals({ fresh: true })
    expect(spy).toHaveBeenCalledWith('products', { params: { _: expect.any(Number) } })
  })
})
