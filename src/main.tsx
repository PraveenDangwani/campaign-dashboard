import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from '@redux/store'
import { addManyRaw } from '@redux/campaigns/campaignsSlice'
import type { RawCampaign } from '@redux/campaigns/types'
import './index.css'

declare global {
  interface Window {
    AddCampaigns: (arr: RawCampaign[]) => void
  }
}

window.AddCampaigns = (arr) => {
  store.dispatch(addManyRaw(arr))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
