import { selectFilteredCampaigns } from '../redux/campaigns/selectors'
import type { RootState } from '../redux/store'

const toSelectorState = (s: RootState) => ({
  ...s,
  filters: {
    ...s.filters,
    dateRange: s.filters.dateRange ?? {
      start: '1900-01-01',
      end: '2999-12-31',
    },
  },
})

const baseAppState: RootState = {
  users: {
    byId: { 1: { id: 1, name: 'Leanne Graham' } },
    status: 'succeeded',
    error: null,
  },
  filters: {
    nameQuery: '',
    status: 'all',
    dateRange: { start: '1900-01-01', end: '2999-12-31' }, // ✅ allowed in RootState
  },
  campaigns: {
    items: [
      {
        id: 1,
        name: 'Layo',
        startDate: '2023-01-10',
        endDate: '2023-02-10',
        budgetUSD: 100,
        userId: 1,
      },
      {
        id: 2,
        name: 'Divavu',
        startDate: '2022-05-01',
        endDate: '2022-06-01',
        budgetUSD: 200,
        userId: 999,
      },
    ],
    status: 'succeeded',
    error: null,
  },
}

describe('selectFilteredCampaigns', () => {
  it('joins username and computes active', () => {
    const rows = selectFilteredCampaigns(toSelectorState(baseAppState))
    const layo = rows.find((r) => r.id === 1)!
    const divavu = rows.find((r) => r.id === 2)!

    expect(layo.userName).toBe('Leanne Graham')
    expect(divavu.userName).toBe('Unknown user')
    expect(typeof layo.isActive).toBe('boolean')
  })

  it('applies name + status + date filters', () => {
    const state: RootState = {
      ...baseAppState,
      filters: {
        ...baseAppState.filters,
        nameQuery: 'lay',
        status: 'all',
        dateRange: { start: '1900-01-01', end: '2999-12-31' },
      },
    }

    const rows = selectFilteredCampaigns(toSelectorState(state))
    expect(rows).toHaveLength(1)
    expect(rows[0].name).toBe('Layo')
  })
})
