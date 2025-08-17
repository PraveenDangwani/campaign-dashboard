export function isActiveCampaign(startDate: string, endDate: string): boolean {
  const now = new Date()
  return new Date(startDate) <= now && now <= new Date(endDate)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function isDateInRange(date: string, start: string, end: string): boolean {
  const d = new Date(date).getTime()
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  return d >= s && d <= e
}
