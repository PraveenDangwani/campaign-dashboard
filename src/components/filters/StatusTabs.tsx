import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setStatus, StatusFilter } from '@redux/filters/filtersSlice'

const tabs: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Running' },
  { key: 'inactive', label: 'Stopped' },
]

export default function StatusTabs() {
  const dispatch = useAppDispatch()
  const current = useAppSelector((s) => s.filters.status)

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = t.key === current
        return (
          <button
            key={t.key}
            onClick={() => dispatch(setStatus(t.key))}
            className={`rounded-full px-3 py-1 text-sm transition
              ${
                active
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
