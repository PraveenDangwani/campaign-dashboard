import { useAppSelector } from '@redux/hooks'
import { selectFilteredCampaigns } from '@redux/campaigns/selectors'
import StatusBadge from './StatusBadge'
import { fmtUSD } from '@utils/currency'
import { useCampaignTable } from '@hooks/useCampaignTable'
import TableHeader from './table/TableHeader'
import TableRow from './table/TableRow'
import PaginationBar from './table/PaginationBar'

export default function CampaignTable() {
  const rowsRaw = useAppSelector(selectFilteredCampaigns)

  const {
    sortKey,
    sortDir,
    setSort,
    pageSize,
    setPage,
    setPageSize,
    pageRows,
    total,
    pageSafe,
    maxPage,
    startIdx,
  } = useCampaignTable(rowsRaw)

  if (rowsRaw.length === 0) {
    return <p className="p-4 text-sm text-gray-600">No campaigns match the current filters.</p>
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{startIdx + 1}</span>–
          <span className="font-medium">{Math.min(total, startIdx + pageSize)}</span> of{' '}
          <span className="font-medium">{total}</span> campaigns
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="rows-select" className="text-sm text-gray-600">
            Rows
          </label>
          <select
            id="rows-select"
            aria-label="Rows" /* optional but nice */
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPage(1)
            }}
            className="rounded-md border px-2 py-1 text-sm"
          >
            {[10, 15, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <TableHeader sortKey={sortKey} sortDir={sortDir} onSort={setSort} />
          <tbody>
            {pageRows.map((r) => (
              <TableRow
                key={r.id}
                name={r.name}
                id={r.id}
                userName={r.userName}
                startDate={r.startDate}
                endDate={r.endDate}
                isActive={r.isActive}
                budgetUSD={r.budgetUSD}
                StatusBadge={StatusBadge}
                fmtUSD={fmtUSD}
              />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationBar
        pageSafe={pageSafe}
        maxPage={maxPage}
        onFirst={() => setPage(1)}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(maxPage, p + 1))}
        onLast={() => setPage(maxPage)}
      />
    </div>
  )
}
