type HttpOptions = { signal?: AbortSignal; retries?: number; retryDelayMs?: number }
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function httpGetJson<T>(url: string, opts: HttpOptions = {}): Promise<T> {
  const { signal, retries = 1, retryDelayMs = 300 } = opts
  let last: unknown
  for (let a = 0; a <= retries; a++) {
    try {
      const res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return (await res.json()) as T
    } catch (e) {
      last = e
      if (signal?.aborted) throw e
      if (a < retries) await sleep(retryDelayMs)
    }
  }
  throw last
}
