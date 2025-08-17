import { configureStore } from '@reduxjs/toolkit'
import campaignsReducer, { addOne } from '@redux/campaigns/campaignsSlice'

describe('campaignsSlice', () => {
  it('adds a campaign', () => {
    const store = configureStore({ reducer: { campaigns: campaignsReducer } })
    store.dispatch(
      addOne({
        id: 999,
        name: 'Test Campaign',
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        budgetUSD: 1000,
        userId: 1,
      }),
    )
    const state = store.getState().campaigns
    expect(state.items.some((c) => c.id === 999 && c.name === 'Test Campaign')).toBe(true)
  })
})
