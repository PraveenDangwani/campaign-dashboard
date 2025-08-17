import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { httpGetJson } from '@services/httpClient'

const makeResponse = (ok: boolean, status = 200, body: unknown = {}) =>
  ({
    ok,
    status,
    json: async () => body,
  }) as Response

const fetchMock = vi.fn()

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('httpGetJson', () => {
  it('returns parsed JSON when response is OK', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse(true, 200, { hello: 'world' }))

    const data = await httpGetJson<{ hello: string }>('https://example.com/api')
    expect(data).toEqual({ hello: 'world' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    // Ensure Accept header was set
    const [, init] = fetchMock.mock.calls[0]
    expect((init as RequestInit)?.headers).toEqual({ Accept: 'application/json' })
  })

  it('retries on failure and succeeds within retry budget', async () => {
    fetchMock
      .mockRejectedValueOnce(new Error('net-1'))
      .mockRejectedValueOnce(new Error('net-2'))
      .mockResolvedValueOnce(makeResponse(true, 200, { ok: 1 }))

    const data = await httpGetJson<{ ok: number }>('https://example.com/retry', {
      retries: 2,
      retryDelayMs: 0,
    })

    expect(data).toEqual({ ok: 1 })
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })

  it('throws the last error if all retries fail', async () => {
    fetchMock
      .mockRejectedValueOnce(new Error('net-1'))
      .mockRejectedValueOnce(new Error('net-2'))
      .mockRejectedValueOnce(new Error('net-3'))

    await expect(
      httpGetJson('https://example.com/retry-fail', { retries: 2, retryDelayMs: 0 }),
    ).rejects.toThrow(/net-3/)
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })

  it('stops retrying if the signal is aborted and throws immediately', async () => {
    const c = new AbortController()
    c.abort()

    fetchMock.mockRejectedValueOnce(new DOMException('Aborted', 'AbortError'))

    await expect(
      httpGetJson('https://example.com/abort', { signal: c.signal, retries: 5, retryDelayMs: 0 }),
    ).rejects.toThrow(/Aborted|AbortError/)

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
