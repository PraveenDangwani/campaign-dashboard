import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@redux/store'
import type { StatusFilter } from '@redux/filters/filtersSlice'

const usersById = (s: RootState) => s.users.byId
const campaigns = (s: RootState) => s.campaigns.items
const nameQuery = (s: RootState) => s.filters.nameQuery
const dateRange = (s: RootState) => s.filters.dateRange
const statusFilter = (s: RootState) => s.filters.status

const invalidRange = (startISO: string, endISO: string) => new Date(startISO) > new Date(endISO)
const inRangeInclusive = (d: string, s: string, e: string) =>
  new Date(d) >= new Date(s) && new Date(d) <= new Date(e)

const isActiveToday = (startISO: string, endISO: string) => {
  const today = new Date(new Date().toISOString().slice(0, 10))
  return today >= new Date(startISO) && today <= new Date(endISO)
}

export const selectFilteredCampaigns = createSelector(
  [campaigns, usersById, nameQuery, dateRange, statusFilter],
  (items, byId, q, range, sFilter: StatusFilter) => {
    const query = q.trim().toLowerCase()
    const start = range.start ?? null
    const end = range.end ?? null

    const filtered = items.filter((c) => {
      if (invalidRange(c.startDate, c.endDate)) return false
      if (query && !c.name.toLowerCase().includes(query)) return false

      if (start && end) {
        const startMatch = inRangeInclusive(c.startDate, start, end)
        const endMatch = inRangeInclusive(c.endDate, start, end)
        if (!startMatch || !endMatch) return false
      } else if (start) {
        const startOnAfter = new Date(c.startDate) >= new Date(start)
        // const endOnAfter = new Date(c.endDate) >= new Date(start)
        if (!startOnAfter) return false
      } else if (end) {
        // const startOnBefore = new Date(c.startDate) <= new Date(end)
        const endOnBefore = new Date(c.endDate) <= new Date(end)
        if (!endOnBefore) return false
      }
      // -------------------

      return true
    })

    const withView = filtered.map((c) => ({
      ...c,
      isActive: isActiveToday(c.startDate, c.endDate),
      userName: byId[c.userId]?.name ?? 'Unknown user',
    }))

    if (sFilter === 'active') return withView.filter((c) => c.isActive)
    if (sFilter === 'inactive') return withView.filter((c) => !c.isActive)
    return withView
  },
)
