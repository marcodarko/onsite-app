import moment from 'moment'
import { Video, MapPin, BarChart3, Utensils } from 'lucide-react'

function getEventStatus(date, startTime, endTime) {
  const now = moment()
  const start = moment(`${date} ${startTime}`, 'YYYY-MM-DD h:mmA')
  const end = moment(`${date} ${endTime}`, 'YYYY-MM-DD h:mmA')

  if (now.isBetween(start, end)) {
    return { type: 'happening', label: 'Happening Now!' }
  }

  if (now.isBefore(start)) {
    const minutesUntil = start.diff(now, 'minutes')

    if (minutesUntil < 60) {
      return { type: 'soon', label: `${minutesUntil} Min Away` }
    }

    const hoursUntil = Math.floor(minutesUntil / 60)
    const minsRemainder = minutesUntil % 60

    if (hoursUntil < 24) {
      if (minsRemainder === 0) {
        return { type: 'future', label: `${hoursUntil} Hours Away` }
      }
      return { type: 'future', label: `${hoursUntil}h ${minsRemainder}m Away` }
    }

    const daysUntil = Math.floor(hoursUntil / 24)
    if (daysUntil === 1) {
      return { type: 'future', label: 'Tomorrow' }
    }
    return { type: 'future', label: `${daysUntil} Days Away` }
  }

  return { type: 'past', label: 'Ended' }
}

function formatTime(timeStr) {
  const m = moment(timeStr, 'h:mmA')
  return m.minutes() === 0 ? m.format('h A') : m.format('h:mm A')
}

function getDifficultyColor(difficulty, colors) {
  switch (difficulty?.toLowerCase()) {
    case 'beginner': return colors.secondary
    case 'intermediate': return '#6366F1'
    case 'advanced': return colors.main
    default: return '#6B7280'
  }
}

export default function EventCard({ event, date, colors }) {
  const status = getEventStatus(date, event.start_time, event.end_time)
  const isHappening = status.type === 'happening'
  const isPast = status.type === 'past'
  const isMeal = event.type === 'meal'

  const cardStyle = {
    backgroundColor: isHappening ? colors.accent : '#FFFFFF',
    border: isHappening ? `3px solid ${colors.main}` : '1px solid #E5E7EB',
    boxShadow: isHappening
      ? `0 4px 24px ${colors.main}44`
      : '0 2px 8px rgba(0,0,0,0.08)',
    opacity: isPast ? 0.6 : 1,
  }

  const badgeStyle = {
    backgroundColor: isHappening
      ? colors.main
      : isPast
        ? '#9CA3AF'
        : '#2563EB',
  }

  return (
    <div className="rounded-2xl p-4 sm:p-6" style={cardStyle}>

      {/* Header: title + time on left, badge on right */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold leading-tight" style={{ color: '#1E1B4B' }}>
            {event.title}
          </h3>
          <span className="text-sm font-bold" style={{ color: '#3730A3' }}>
            {formatTime(event.start_time)} – {formatTime(event.end_time)}
          </span>
        </div>
        <span
          className={`shrink-0 text-white text-xs font-bold px-3 py-1.5 rounded-lg${isHappening ? ' badge-pulse' : ''}`}
          style={badgeStyle}
        >
          {status.label}
        </span>
      </div>

      {/* Meal icon or moderators */}
      {isMeal ? (
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.secondary}33` }}
          >
            <Utensils className="w-4 h-4" style={{ color: colors.secondary }} />
          </div>
          <span className="text-sm text-gray-500 font-medium">Meal break</span>
        </div>
      ) : event.moderators?.length > 0 ? (
        <div className="flex flex-wrap gap-3 mb-3">
          {event.moderators.map((mod, i) => (
            <div key={i} className="flex items-center gap-2">
              <img
                src={mod.image}
                alt={mod.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="text-sm font-semibold text-gray-700">{mod.name}</span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Description */}
      {event.description && (
        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
      )}

      {/* Only show divider + meta if there's something below and event hasn't ended */}
      {!isPast && (event.tags?.length > 0 || event['tools-needed']?.length > 0) && (
        <>
          <hr className="border-gray-200 mb-3" />

          {/* Tags */}
          {event.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {event.tags.map((tag, i) => (
                <span key={i} className="text-xs font-medium" style={{ color: colors.main }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Tools Needed */}
          {event['tools-needed']?.length > 0 && (
            <p className="text-xs mb-4">
              <span className="font-semibold" style={{ color: colors.main }}>
                tools needed:{' '}
              </span>
              <span className="text-blue-700">{event['tools-needed'].join(', ')}</span>
            </p>
          )}
        </>
      )}

      {/* Action Buttons */}
      {(event['zoom-link'] || event.room || event.difficulty) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {!isPast && event['zoom-link'] && (
            <a
              href={event['zoom-link']}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Video className="w-3 h-3" />
              Zoom
            </a>
          )}
          {event.room && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
              style={{ backgroundColor: '#1E1B4B' }}
            >
              <MapPin className="w-3 h-3" />
              {event.room}
            </span>
          )}
          {event.difficulty && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white capitalize"
              style={{ backgroundColor: getDifficultyColor(event.difficulty, colors) }}
            >
              <BarChart3 className="w-3 h-3" />
              {event.difficulty}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
