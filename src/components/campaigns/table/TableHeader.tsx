import { SortDir, SortKey } from '@hooks/useCampaignTable'

export default function TableHeader({
  sortKey,
  sortDir,
  onSort,
}: {
  sortKey: SortKey
  sortDir: SortDir
  onSort: (key: SortKey) => void
}) {
  const Th = ({ label, keyName }: { label: string; keyName: SortKey }) => (
    <th className="px-4 py-3">
      <button
        className="flex items-center gap-1 text-left text-sm text-white hover:opacity-90"
        onClick={() => onSort(keyName)}
        aria-label={`Sort by ${label}`}
      >
        {label}
        <span className="text-xs opacity-80">
          {sortKey === keyName ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  )

  return (
    <thead className="bg-blue-600">
      <tr className="text-left">
        <Th label="Campaign" keyName="id" />
        <Th label="User" keyName="userName" />
        <Th label="Start" keyName="startDate" />
        <Th label="End" keyName="endDate" />
        <Th label="Status" keyName="isActive" />
        <Th label="Budget" keyName="budgetUSD" />
      </tr>
    </thead>
  )
}
