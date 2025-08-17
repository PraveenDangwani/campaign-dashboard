export default function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
    >
      <span
        className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${active ? 'bg-green-600' : 'bg-red-600'}`}
      />
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}
