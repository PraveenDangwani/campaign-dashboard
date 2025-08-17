import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setNameQuery } from '@redux/filters/filtersSlice'
import { useDebouncedValue } from '@hooks/useDebouncedValue'

export default function NameSearchInput() {
  const dispatch = useAppDispatch()
  const nameQuery = useAppSelector((s) => s.filters.nameQuery)
  const [local, setLocal] = useState(nameQuery)
  const debounced = useDebouncedValue(local, 200)

  useEffect(() => setLocal(nameQuery), [nameQuery])
  useEffect(() => {
    dispatch(setNameQuery(debounced))
  }, [debounced, dispatch])

  const clearInput = () => {
    setLocal('')
    dispatch(setNameQuery(''))
  }

  return (
    <div className="grid gap-1">
      <label htmlFor="nameQuery" className="text-sm font-medium">
        Search by Campaign Name
      </label>
      <div className="relative">
        <input
          id="nameQuery"
          type="text"
          placeholder="e.g. Layo"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 pr-8 outline-none ring-blue-200 focus:ring"
          aria-label="Campaign name search"
        />
        {local && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
