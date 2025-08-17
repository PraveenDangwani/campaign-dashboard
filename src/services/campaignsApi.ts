import { SEED_CAMPAIGNS } from '@data/seedCampaigns'
import type { RawCampaign } from '@redux/campaigns/types'

export async function fetchCampaignsApi(signal?: AbortSignal): Promise<RawCampaign[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(SEED_CAMPAIGNS), 900)

    if (signal) {
      const onAbort = () => {
        clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      }
      if (signal.aborted) onAbort()
      else signal.addEventListener('abort', onAbort, { once: true })
    }
  })
}

export default fetchCampaignsApi
