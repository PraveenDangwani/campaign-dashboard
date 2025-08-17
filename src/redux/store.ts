import { configureStore } from '@reduxjs/toolkit'
import campaignsReducer from './campaigns/campaignsSlice'
import filtersReducer from './filters/filtersSlice'
import usersReducer from './users/usersSlice'

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    filters: filtersReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
