import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '../testUtils'
import NameSearchInput from '@components/filters/NameSearchInput'
import { act } from '@testing-library/react'

describe('<NameSearchInput />', () => {
  it('debounces and updates store', async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(<NameSearchInput />, {
      filters: {
        nameQuery: '',
        status: 'all',
        dateRange: { start: '1900-01-01', end: '2999-12-31' },
      },
      campaigns: { items: [], status: 'succeeded', error: null },
      users: { byId: {}, status: 'succeeded', error: null },
    })

    const input = screen.getByLabelText(/search by campaign name/i)
    await act(async () => {
      await user.type(input, 'Lay')
      // allow debounce to flush
      await new Promise((r) => setTimeout(r, 220))
    })
    expect(store.getState().filters.nameQuery).toBe('Lay')
  })
})
