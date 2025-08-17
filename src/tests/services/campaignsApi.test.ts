import { describe, it, expect, vi } from 'vitest'
import { fetchCampaignsApi } from '@services/campaignsApi'

describe('fetchCampaignsApi', () => {
  it('resolves with seed campaigns after the delay', async () => {
    vi.useFakeTimers()
    const p = fetchCampaignsApi()

    vi.runAllTimers()
    const data = await p
    expect(Array.isArray(data)).toBe(true)

    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('name')
    vi.useRealTimers()
  })

  it('rejects with AbortError when aborted before completion', async () => {
    vi.useFakeTimers()
    const ac = new AbortController()
    const p = fetchCampaignsApi(ac.signal)
    ac.abort()

    await expect(p).rejects.toMatchObject({
      name: 'AbortError',
    })

    vi.useRealTimers()
  })
})
