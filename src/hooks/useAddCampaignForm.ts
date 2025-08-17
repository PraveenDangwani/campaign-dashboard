import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { addOne } from '@redux/campaigns/campaignsSlice'

export function useAddCampaignForm({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()
  const campaigns = useAppSelector((s) => s.campaigns.items)
  const usersById = useAppSelector((s) => s.users.byId)

  const [name, setName] = useState('')
  const [nameDirty, setNameDirty] = useState(false)
  const [nameTouched, setNameTouched] = useState(false)

  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')

  const [budget, setBudget] = useState<string>('0')
  const [userId, setUserId] = useState<string>('')

  const userIdNum: number | null = userId === '' ? null : Number(userId)
  const userUnknownWarning =
    userId !== '' &&
    (!Number.isFinite(userIdNum) || (userIdNum !== null && !(userIdNum in usersById)))

  const isDuplicateName = useCallback(
    (value: string) => {
      return campaigns.some((c) => c.name.trim().toLowerCase() === value.trim().toLowerCase())
    },
    [campaigns],
  )

  const sanitizeBudget = (raw: string) => {
    if (raw === '') return ''

    const onlyDigits = raw.replace(/[^\d]/g, '')
    if (onlyDigits === '') return '0'

    const n = Math.max(0, parseInt(onlyDigits, 10) || 0)
    return String(n)
  }

  const onBudgetChange = (v: string) => {
    setBudget(sanitizeBudget(v))
  }

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!name.trim()) {
      e.name = 'Name is required'
    } else if (isDuplicateName(name)) {
      e.name = 'Campaign name already exists'
    }
    if (start && end && new Date(end) < new Date(start)) e.dates = 'Start must be ≤ End'
    if (Number.isNaN(Number(budget)) || Number(budget) < 0)
      e.budget = 'Budget must be a non-negative number'
    return e
  }, [name, start, end, budget, isDuplicateName])

  const canSave = Object.keys(errors).length === 0 && name.trim().length > 0
  const showNameError = (nameDirty || nameTouched) && !!errors.name

  // keyboard: ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const onStartChange = (v: string) => {
    setStart(v)
    if (end && new Date(end) < new Date(v)) setEnd(v)
  }
  const onEndChange = (v: string) => {
    if (start && new Date(v) < new Date(start)) setEnd(start)
    else setEnd(v)
  }

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!canSave) return
    dispatch(
      addOne({
        id: campaigns.length + 1,
        name: name.trim(),
        startDate: start || new Date().toISOString().slice(0, 10),
        endDate: end || new Date().toISOString().slice(0, 10),
        budgetUSD: Number(budget),
        userId: userId ? Number(userId) : 0,
      }),
    )
    onClose()
  }

  return {
    name,
    setName,
    nameDirty,
    setNameDirty,
    nameTouched,
    setNameTouched,
    start,
    end,
    budget,
    setBudget,
    userId,
    setUserId,
    errors,
    canSave,
    showNameError,
    userUnknownWarning,
    onStartChange,
    onEndChange,
    onBudgetChange,
    onSubmit,
  }
}
