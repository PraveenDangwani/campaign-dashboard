import { configureStore } from '@reduxjs/toolkit'
import usersReducer, { fetchUsers } from '@redux/users/usersSlice'

describe('usersSlice', () => {
  it('loads users via thunk (fulfilled)', async () => {
    const store = configureStore({ reducer: { users: usersReducer } })
    await store.dispatch(fetchUsers())

    const state = store.getState().users
    expect(state.status).toBe('succeeded')
    expect(Object.keys(state.byId).length).toBeGreaterThan(0)
    expect(state.byId[1].name).toBe('Leanne Graham')
  })

  it('handles error (rejected)', async () => {
    const original = global.fetch
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 500 })

    const store = configureStore({ reducer: { users: usersReducer } })
    await store.dispatch(fetchUsers())

    const state = store.getState().users
    expect(state.status).toBe('failed')
    expect(state.error).toBeTruthy()

    global.fetch = original
  })
})
