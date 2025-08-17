import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Campaign, RawCampaign } from './types'
import fetchCampaignsApi from '../../services/campaignsApi'

const toISO = (mdy: string) => {
  const [m, d, y] = mdy.split('/').map((s) => parseInt(s.trim(), 10))
  return new Date(y, m - 1, d).toISOString().slice(0, 10)
}

const normalize = (raw: RawCampaign): Campaign => ({
  id: raw.id,
  name: raw.name.trim(),
  startDate: toISO(raw.startDate),
  endDate: toISO(raw.endDate),
  budgetUSD: raw.Budget,
  userId: raw.userId,
})

export const fetchCampaigns = createAsyncThunk<Campaign[], void, { rejectValue: string }>(
  'campaigns/fetchAll',
  async (_, { signal, rejectWithValue }) => {
    try {
      const raw = await fetchCampaignsApi(signal)
      return raw.map(normalize)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch campaigns'
      return rejectWithValue(msg)
    }
  },
)

type State = {
  items: Campaign[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: State = {
  items: [],
  status: 'idle',
  error: null,
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    addManyRaw(state, action: PayloadAction<RawCampaign[]>) {
      const normalized = action.payload.map(normalize)
      state.items.push(...normalized)
    },
    addOne(state, action: PayloadAction<Campaign>) {
      state.items.push(action.payload)
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCampaigns.pending, (s) => {
      s.status = 'loading'
      s.error = null
    })
      .addCase(fetchCampaigns.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.items = a.payload
      })
      .addCase(fetchCampaigns.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.payload ?? 'Failed to fetch campaigns'
      })
  },
})

export const { addManyRaw, addOne } = campaignsSlice.actions
export default campaignsSlice.reducer
