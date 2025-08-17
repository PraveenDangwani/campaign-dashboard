import type { ComponentType, ReactElement } from 'react'
import { formatDateDDMMYYYY } from '@utils/dateFormat'

type StatusBadgeProps = { active: boolean }

type TableRowProps = {
  name: string
  id: number
  userName: string
  startDate: string
  endDate: string
  isActive: boolean
  budgetUSD: number
  StatusBadge: ComponentType<StatusBadgeProps>
  fmtUSD: Intl.NumberFormat
}

export default function TableRow({
  name,
  id,
  userName,
  startDate,
  endDate,
  isActive,
  budgetUSD,
  StatusBadge,
  fmtUSD,
}: TableRowProps): ReactElement {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="cursor-default font-medium text-blue-700 hover:underline">{name}</span>
          <span className="text-xs text-gray-500">ID: {id}</span>
        </div>
      </td>
      <td className="px-4 py-3">{userName}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{formatDateDDMMYYYY(startDate)}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{formatDateDDMMYYYY(endDate)}</td>
      <td className="px-4 py-3">
        <StatusBadge active={isActive} />
      </td>
      <td className="px-4 py-3">{fmtUSD.format(budgetUSD)}</td>
    </tr>
  )
}
