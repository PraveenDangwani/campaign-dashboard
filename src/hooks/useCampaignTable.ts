import { useMemo, useState } from 'react'

export type SortKey =
  | 'id'
  | 'name'
  | 'startDate'
  | 'endDate'
  | 'budgetUSD'
  | 'userName'
  | 'isActive'

export type SortDir = 'asc' | 'desc'

export interface RowLike {
  id: number
  name: string
  startDate: string
  endDate: string
  budgetUSD: number
  userName: string
  isActive: boolean
}

type Primitive = string | number | boolean

function compare(a: Primitive, b: Primitive): number {
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b)
  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return (a ? 1 : 0) - (b ? 1 : 0)
  return String(a).localeCompare(String(b))
}

export function useCampaignTable<T extends RowLike>(rowsRaw: readonly T[]) {
  const [sortKey, setSortKey] = useState<SortKey>('startDate')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)

  const rows = useMemo(() => {
    const sorted = [...rowsRaw].sort((a, b) => {
      const va = a[sortKey] as Primitive
      const vb = b[sortKey] as Primitive
      const res = compare(va, vb)
      return sortDir === 'asc' ? res : -res
    })
    return sorted
  }, [rowsRaw, sortKey, sortDir])

  const total = rows.length
  const maxPage = Math.max(1, Math.ceil(total / pageSize))
  const pageSafe = Math.min(page, maxPage)
  const startIdx = (pageSafe - 1) * pageSize
  const pageRows = rows.slice(startIdx, startIdx + pageSize)

  const setSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return {
    sortKey,
    sortDir,
    setSort,
    page,
    pageSize,
    setPage,
    setPageSize,
    rows,
    pageRows,
    total,
    pageSafe,
    maxPage,
    startIdx,
  }
}
