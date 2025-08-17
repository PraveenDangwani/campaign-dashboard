export function PaginationBar({
  pageSafe,
  maxPage,
  onFirst,
  onPrev,
  onNext,
  onLast,
}: {
  pageSafe: number
  maxPage: number
  onFirst: () => void
  onPrev: () => void
  onNext: () => void
  onLast: () => void
}) {
  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <div className="text-sm text-gray-600">
        Page <span className="font-medium">{pageSafe}</span> of{' '}
        <span className="font-medium">{maxPage}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onFirst}
          disabled={pageSafe === 1}
          className="rounded border px-2 py-1 text-sm disabled:opacity-50"
        >
          ⏮ First
        </button>
        <button
          onClick={onPrev}
          disabled={pageSafe === 1}
          className="rounded border px-2 py-1 text-sm disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <button
          onClick={onNext}
          disabled={pageSafe === maxPage}
          className="rounded border px-2 py-1 text-sm disabled:opacity-50"
        >
          Next ▶
        </button>
        <button
          onClick={onLast}
          disabled={pageSafe === maxPage}
          className="rounded border px-2 py-1 text-sm disabled:opacity-50"
        >
          Last ⏭
        </button>
      </div>
    </div>
  )
}
export default PaginationBar
