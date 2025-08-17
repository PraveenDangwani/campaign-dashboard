import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from './types'
import { fetchUsersApi } from '@services/usersApi'

const getErrorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : 'Failed to fetch users'

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetch',
  async (_, { signal, rejectWithValue }) => {
    try {
      return await fetchUsersApi(signal)
    } catch (e: unknown) {
      return rejectWithValue(getErrorMessage(e))
    }
  },
)

type UsersState = {
  byId: Record<number, User>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initial: UsersState = { byId: {}, status: 'idle', error: null }

const usersSlice = createSlice({
  name: 'users',
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => {
      s.status = 'loading'
      s.error = null
    })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.status = 'succeeded'
        a.payload.forEach((u) => {
          s.byId[u.id] = u
        })
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.payload ?? 'Failed to fetch users'
      })
  },
})

export default usersSlice.reducer
