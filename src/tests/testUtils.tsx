import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'

import campaignsReducer from '@redux/campaigns/campaignsSlice'
import usersReducer from '@redux/users/usersSlice'
import filtersReducer from '@redux/filters/filtersSlice'

type PreloadedState<S> = {
  [K in keyof S]?: S[K] extends object ? PreloadedState<S[K]> : S[K]
}

const reducer = {
  campaigns: campaignsReducer,
  users: usersReducer,
  filters: filtersReducer,
}

export type RootState = {
  campaigns: ReturnType<typeof campaignsReducer>
  users: ReturnType<typeof usersReducer>
  filters: ReturnType<typeof filtersReducer>
}

export function makeTestStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    preloadedState: preloadedState as unknown as RootState | undefined,
  })
}

export type AppStore = ReturnType<typeof makeTestStore>

export function renderWithStore(ui: ReactElement, preloadedState?: PreloadedState<RootState>) {
  const store = makeTestStore(preloadedState)

  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )

  return {
    ...render(ui, { wrapper }),
    store,
  }
}
