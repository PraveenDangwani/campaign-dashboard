import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '../testUtils'
import AddCampaignDialog from '@components/add/AddCampaignDialog'

describe('<AddCampaignDialog />', () => {
  it('validates required name and saves a campaign', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    const { store } = renderWithStore(<AddCampaignDialog onClose={onClose} />, {
      campaigns: { items: [], status: 'succeeded', error: null },
      users: { byId: {}, status: 'succeeded', error: null },
      filters: {
        nameQuery: '',
        status: 'all',
        dateRange: { start: '1900-01-01', end: '2999-12-31' },
      },
    })

    // initially disabled (name required)
    const saveBtn = screen.getByRole('button', { name: /save/i })
    expect(saveBtn).toBeDisabled()

    await user.type(screen.getByLabelText(/name/i), 'New One')
    await user.clear(screen.getByLabelText(/Budget/i))
    await user.type(screen.getByLabelText(/Budget/i), '500')
    await user.click(saveBtn)

    // after save, dialog should close
    expect(onClose).toHaveBeenCalled()

    // store updated
    const items = store.getState().campaigns.items
    expect(items.some((c) => c.name === 'New One' && c.budgetUSD === 500)).toBe(true)
  })

  it('shows error when name is emptied after typing', async () => {
    const user = userEvent.setup()
    renderWithStore(<AddCampaignDialog onClose={() => {}} />, {
      campaigns: { items: [], status: 'succeeded', error: null },
      users: { byId: {}, status: 'succeeded', error: null },
      filters: {
        nameQuery: '',
        status: 'all',
        dateRange: { start: '1900-01-01', end: '2999-12-31' },
      },
    })

    const name = screen.getByLabelText(/name/i)
    await user.type(name, 'A')
    await user.clear(name)
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
  })
})
