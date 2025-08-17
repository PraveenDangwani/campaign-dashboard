export default function ErrorBanner({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700"
    >
      <span>Error: {message}</span>
      {onRetry && (
        <button onClick={onRetry} className="rounded bg-red-600 px-2 py-1 text-white">
          Retry
        </button>
      )}
    </div>
  )
}
