import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { fetchCampaigns } from '@redux/campaigns/campaignsSlice'

export function useCampaignsLoad() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((s) => s.campaigns.status)
  useEffect(() => {
    if (status === 'idle') dispatch(fetchCampaigns())
  }, [status, dispatch])
}
