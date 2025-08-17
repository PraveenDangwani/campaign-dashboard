import { useAddCampaignForm } from '@hooks/useAddCampaignForm'

export default function AddCampaignDialog({ onClose }: { onClose: () => void }) {
  const {
    name,
    setName,
    nameDirty,
    setNameDirty,
    setNameTouched,
    showNameError,
    errors,
    start,
    end,
    onStartChange,
    onEndChange,
    budget,
    onBudgetChange,
    setBudget,
    userId,
    setUserId,
    userUnknownWarning,
    canSave,
    onSubmit,
  } = useAddCampaignForm({ onClose })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Campaign</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="grid gap-3" onSubmit={onSubmit}>
          {/* Name */}
          <label className="grid gap-1">
            <span className="text-sm">
              Name <span className="text-red-600">*</span>
            </span>
            <input
              value={name}
              onChange={(e) => {
                if (!nameDirty) setNameDirty(true)
                setName(e.target.value)
              }}
              onBlur={() => setNameTouched(true)}
              required
              aria-required="true"
              aria-invalid={showNameError}
              className="rounded-lg border px-3 py-2"
            />
            {showNameError && <small className="text-red-600">{errors.name}</small>}
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm">Start</span>
              <input
                type="date"
                value={start}
                onChange={(e) => onStartChange(e.target.value)}
                className="rounded-lg border px-3 py-2"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">End</span>
              <input
                type="date"
                value={end}
                min={start || undefined}
                onChange={(e) => onEndChange(e.target.value)}
                className="rounded-lg border px-3 py-2"
              />
            </label>
          </div>
          {errors.dates && <small className="text-red-600">{errors.dates}</small>}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm">Budget (USD)</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={budget}
                onFocus={() => {
                  if (budget === '0') setBudget('')
                }}
                onBlur={() => {
                  if (budget === '') setBudget('0')
                }}
                onChange={(e) => onBudgetChange(e.target.value)}
                className="rounded-lg border px-3 py-2"
              />
              {errors.budget && <small className="text-red-600">{errors.budget}</small>}
            </label>

            <label className="grid gap-1">
              <span className="text-sm">User ID</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                step="1"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="rounded-lg border px-3 py-2"
              />
              {/* Non-blocking existence warning */}
              {userUnknownWarning && (
                <small className="text-amber-600">
                  No user found with this ID. It will show as “Unknown user”.
                </small>
              )}
            </label>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
