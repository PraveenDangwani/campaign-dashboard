import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCampaignTable } from '@hooks/useCampaignTable'

type Row = {
  id: number
  name: string
  userName: string
  startDate: string
  endDate: string
  budgetUSD: number
  isActive: boolean
}

const rows: Row[] = [
  {
    id: 3,
    name: 'Gamma',
    userName: 'User C',
    startDate: '2023-02-01',
    endDate: '2023-02-10',
    budgetUSD: 300,
    isActive: false,
  },
  {
    id: 1,
    name: 'Alpha',
    userName: 'User A',
    startDate: '2023-01-01',
    endDate: '2023-01-10',
    budgetUSD: 100,
    isActive: true,
  },
  {
    id: 2,
    name: 'Bravo',
    userName: 'User B',
    startDate: '2023-01-15',
    endDate: '2023-01-20',
    budgetUSD: 200,
    isActive: true,
  },
  {
    id: 4,
    name: 'Delta',
    userName: 'User D',
    startDate: '2023-03-01',
    endDate: '2023-03-05',
    budgetUSD: 400,
    isActive: false,
  },
]

describe('useCampaignTable', () => {
  it('defaults to sorting by startDate asc', () => {
    const { result } = renderHook(() => useCampaignTable<Row>(rows))
    // Default sortKey was 'startDate' and 'asc' in your hook
    const firstIds = result.current.pageRows.map((r) => r.id)
    expect(firstIds).toEqual([1, 2, 3, 4]) // Jan 1, Jan 15, Feb 1, Mar 1
  })

  it('changes sort key and toggles dir when clicking same key again', () => {
    const { result } = renderHook(() => useCampaignTable<Row>(rows))

    act(() => result.current.setSort('id'))
    expect(result.current.sortKey).toBe('id')
    expect(result.current.sortDir).toBe('asc')
    expect(result.current.pageRows.map((r) => r.id)).toEqual([1, 2, 3, 4])

    act(() => result.current.setSort('id'))
    expect(result.current.sortDir).toBe('desc')
    expect(result.current.pageRows.map((r) => r.id)).toEqual([4, 3, 2, 1])

    act(() => result.current.setSort('name'))
    expect(result.current.sortKey).toBe('name')
    expect(result.current.sortDir).toBe('asc')
    expect(result.current.pageRows.map((r) => r.name)).toEqual(['Alpha', 'Bravo', 'Delta', 'Gamma'])
  })

  it('sorts booleans correctly (isActive)', () => {
    const { result } = renderHook(() => useCampaignTable<Row>(rows))
    act(() => result.current.setSort('isActive'))
    expect(result.current.pageRows.map((r) => r.isActive)).toEqual([false, false, true, true])

    act(() => result.current.setSort('isActive'))
    expect(result.current.pageRows.map((r) => r.isActive)).toEqual([true, true, false, false])
  })

  it('handles pagination: page size and page calculations', () => {
    const { result } = renderHook(() => useCampaignTable(rows))

    act(() => result.current.setPageSize(3))

    act(() => result.current.setPage(2))
    expect(result.current.pageRows.map((r) => r.id)).toEqual([4])
  })
})
