import { configureStore } from '@reduxjs/toolkit'
import filtersReducer, { setNameQuery, setStatus, setDateRange } from '@redux/filters/filtersSlice'

describe('filtersSlice', () => {
  it('updates filters', () => {
    const store = configureStore({ reducer: { filters: filtersReducer } })
    store.dispatch(setNameQuery('layo'))
    store.dispatch(setStatus('active'))
    store.dispatch(setDateRange({ start: '2023-01-01', end: '2023-12-31' }))

    const s = store.getState().filters
    expect(s.nameQuery).toBe('layo')
    expect(s.status).toBe('active')
    expect(s.dateRange?.start).toBe('2023-01-01')
  })
})
