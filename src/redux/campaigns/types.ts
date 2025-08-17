export type RawCampaign = {
  id: number
  name: string
  startDate: string
  endDate: string
  Budget: number
  userId: number
}

export type Campaign = {
  id: number
  name: string
  startDate: string
  endDate: string
  budgetUSD: number
  userId: number
}
