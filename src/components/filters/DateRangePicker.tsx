import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setDateRange } from '@redux/filters/filtersSlice'

export default function DateRangePicker() {
  const dispatch = useAppDispatch()
  const { start, end } = useAppSelector((s) => s.filters.dateRange)
  const bad = start && end ? new Date(end) < new Date(start) : false

  const onStartChange = (v: string) => {
    dispatch(setDateRange({ start: v || null, end }))
  }

  const onEndChange = (v: string) => {
    dispatch(setDateRange({ start, end: v || null }))
  }

  return (
    <div className="grid gap-1">
      <span className="text-sm font-medium">Date Range</span>
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={start ?? ''}
          onChange={(e) => onStartChange(e.target.value)}
          aria-label="Start date"
          className="rounded-lg border px-3 py-2"
        />
        <span>→</span>
        <input
          type="date"
          value={end ?? ''}
          min={start ?? undefined}
          onChange={(e) => onEndChange(e.target.value)}
          aria-label="End date"
          aria-invalid={bad}
          className="rounded-lg border px-3 py-2"
        />
      </div>
      {bad && <small className="text-red-600">End date cannot be before start date.</small>}
      <small className="text-xs text-gray-500">
        You can set only a Start or only an End to filter open-ended ranges.
      </small>
    </div>
  )
}
