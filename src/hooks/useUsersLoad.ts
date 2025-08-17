import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { fetchUsers } from '@redux/users/usersSlice'

export function useUsersLoad() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((s) => s.users.status)
  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [status, dispatch])
}
