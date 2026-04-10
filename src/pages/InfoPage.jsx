import { useEffect, useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { INFO_URL } from '../config'

function InfoPage() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(INFO_URL)
      .then(({ data }) => setContent(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="py-6 sm:py-10 px-4"
      style={{
        backgroundImage: 'url(/pattern.svg)',
        backgroundSize: '220px 220px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <p className="text-2xl mb-2">⚠️</p>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Failed to load info</h2>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl">
            <div className="markdown-content">
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoPage
