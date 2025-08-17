import { httpGetJson } from './httpClient'
import { CONFIG } from '@utils/config'
import type { User } from '@redux/users/types'

export async function fetchUsersApi(signal?: AbortSignal): Promise<User[]> {
  return await httpGetJson<User[]>(`${CONFIG.USERS_API_BASE}/users`, { signal, retries: 2 })
}
