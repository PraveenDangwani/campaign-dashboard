export default function LoadingRows({ rows = 8 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-blue-600">
          <tr className="text-left">
            {['Campaign', 'User', 'Start', 'End', 'Status', 'Budget'].map((h) => (
              <th key={h} className="px-4 py-3 text-sm font-medium text-white">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="animate-pulse">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b">
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-32 rounded bg-gray-200" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-28 rounded bg-gray-200" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-28 rounded bg-gray-200" />
              </td>

              <td className="px-4 py-3">
                <div className="h-5 w-20 rounded-full bg-gray-200" />
              </td>

              <td className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-gray-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
