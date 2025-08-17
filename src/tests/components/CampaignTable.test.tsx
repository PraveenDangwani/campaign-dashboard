import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CampaignTable from '@components/campaigns/CampaignTable'
import { renderWithStore, type RootState } from '../testUtils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Preloaded<S> = Parameters<typeof renderWithStore>[1]

const preloaded = {
  users: {
    byId: { 1: { id: 1, name: 'Leanne Graham' } },
    status: 'succeeded', // stays literal via `satisfies`
    error: null,
  },
  campaigns: {
    items: [
      {
        id: 1,
        name: 'Alpha',
        startDate: '2023-01-01',
        endDate: '2023-02-01',
        budgetUSD: 100,
        userId: 1,
      },
      {
        id: 2,
        name: 'Bravo',
        startDate: '2023-01-10',
        endDate: '2023-02-10',
        budgetUSD: 200,
        userId: 1,
      },
    ],
    status: 'succeeded',
    error: null,
  },
  filters: {
    nameQuery: '',
    status: 'all',
    dateRange: { start: '1900-01-01', end: '2999-12-31' },
  },
} satisfies Preloaded<RootState>

describe('<CampaignTable />', () => {
  it('renders rows and formats budget/dates', () => {
    renderWithStore(<CampaignTable />, preloaded)

    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Bravo')).toBeInTheDocument()
  })

  it('changes page size', async () => {
    renderWithStore(<CampaignTable />, {
      ...preloaded,
      campaigns: {
        ...preloaded.campaigns,
        status: 'succeeded' as const,
        error: null as null,
        items: Array.from({ length: 30 }).map((_, i) => ({
          id: i + 1,
          name: `C${i + 1}`,
          startDate: '2023-01-01',
          endDate: '2023-01-02',
          budgetUSD: 10,
          userId: 1,
        })),
      },
    })

    const user = userEvent.setup()
    const select = screen.getByLabelText(/Rows/i)
    await user.selectOptions(select, '25')
    expect(select).toHaveValue('25')
  })
})
