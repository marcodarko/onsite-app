import { useEffect, useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { EVENTS_URL } from './config'
import NavBar from './components/NavBar'
import EventsPage from './pages/EventsPage'
import InfoPage from './pages/InfoPage'

export const EventsContext = createContext(null)
export const useEvents = () => useContext(EventsContext)

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '227, 72, 148'
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white font-semibold tracking-wide">Loading...</p>
      </div>
    </div>
  )
}

function ErrorScreen({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
        <p className="text-2xl mb-2">⚠️</p>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Failed to load data</h2>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  )
}

function App() {
  const [eventsData, setEventsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(EVENTS_URL)
      .then(({ data }) => {
        setEventsData(data)
        const root = document.documentElement
        root.style.setProperty('--color-main', data.colors.main)
        root.style.setProperty('--color-main-rgb', hexToRgb(data.colors.main))
        root.style.setProperty('--color-secondary', data.colors.secondary)
        root.style.setProperty('--color-accent', data.colors.accent)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, var(--color-main, #E34894) 0%, var(--color-secondary, #4FCE8E) 100%)' }}
    >
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen message={error} />
      ) : (
        <EventsContext.Provider value={eventsData}>
          <BrowserRouter>
            <NavBar colors={eventsData.colors} />
            <Routes>
              <Route path="/" element={<EventsPage />} />
              <Route path="/info" element={<InfoPage />} />
            </Routes>
          </BrowserRouter>
        </EventsContext.Provider>
      )}
    </div>
  )
}

export default App
