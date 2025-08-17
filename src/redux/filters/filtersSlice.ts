import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StatusFilter = 'all' | 'active' | 'inactive'
type DateRange = { start: string | null; end: string | null }

type State = {
  nameQuery: string
  dateRange: DateRange
  status: StatusFilter
}

const initial: State = {
  nameQuery: '',
  dateRange: { start: null, end: null },
  status: 'all',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initial,
  reducers: {
    setNameQuery(s, a: PayloadAction<string>) {
      s.nameQuery = a.payload
    },
    setDateRange(s, a: PayloadAction<DateRange>) {
      s.dateRange = a.payload
    },
    setStatus(s, a: PayloadAction<StatusFilter>) {
      s.status = a.payload
    },
  },
})

export const { setNameQuery, setDateRange, setStatus } = filtersSlice.actions
export default filtersSlice.reducer
