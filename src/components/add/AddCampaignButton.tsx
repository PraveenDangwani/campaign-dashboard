import { useState } from 'react'
import AddCampaignDialog from './AddCampaignDialog'

export default function AddCampaignButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
      >
        + Campaign
      </button>
      {open && <AddCampaignDialog onClose={() => setOpen(false)} />}
    </>
  )
}
