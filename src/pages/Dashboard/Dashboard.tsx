import StatusTabs from '@components/filters/StatusTabs'
import DateRangePicker from '@components/filters/DateRangePicker'
import NameSearchInput from '@components/filters/NameSearchInput'
import AddCampaignButton from '@components/add/AddCampaignButton'
import CampaignTable from '@components/campaigns/CampaignTable'
import ErrorBanner from '@components/shared/ErrorBanner'
import LoadingRows from '@components/campaigns/LoadingRows'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { fetchUsers } from '@redux/users/usersSlice'
import { fetchCampaigns } from '@redux/campaigns/campaignsSlice'
import { useCampaignsLoad } from '@hooks/useCampaignsLoad'
import { useUsersLoad } from '@hooks/useUsersLoad'

export default function Dashboard() {
  const dispatch = useAppDispatch()

  useUsersLoad()
  useCampaignsLoad()

  const usersStatus = useAppSelector((s) => s.users.status)
  const usersError = useAppSelector((s) => s.users.error)

  const campaignsStatus = useAppSelector((s) => s.campaigns.status)
  const campaignsError = useAppSelector((s) => s.campaigns.error)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="flex w-full items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">
            Campaign <span className="text-blue-600">Dashboard</span>
          </h1>
          <AddCampaignButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="grid gap-3 md:grid-cols-2 md:items-end">
              <div className="md:pr-3">
                <DateRangePicker />
              </div>
              <div className="md:pl-3">
                <NameSearchInput />
              </div>
            </div>

            <div className="pt-1">
              <StatusTabs />
            </div>
          </div>
        </section>

        {usersStatus === 'failed' && (
          <ErrorBanner
            message={usersError ?? 'Failed to load users'}
            onRetry={() => dispatch(fetchUsers())}
          />
        )}

        {campaignsStatus === 'loading' && (
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <LoadingRows rows={8} />
          </section>
        )}

        {campaignsStatus === 'failed' && (
          <ErrorBanner
            message={campaignsError ?? 'Failed to load campaigns'}
            onRetry={() => dispatch(fetchCampaigns())}
          />
        )}

        {campaignsStatus === 'succeeded' && (
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <CampaignTable />
          </section>
        )}
      </main>
    </div>
  )
}
