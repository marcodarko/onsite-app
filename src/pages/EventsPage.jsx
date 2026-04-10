import moment from 'moment'
import { useEvents } from '../App'
import EventCard from '../components/EventCard'

function EventsPage() {
  const { onsite, colors } = useEvents()
  const days = Object.entries(onsite)

  return (
    <div className="py-6 sm:py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8 sm:mb-10">
          <img src="/logo.png" alt="Onsite Logo" className="h-20 sm:h-32 object-contain drop-shadow-lg" />
        </div>

        {days.map(([dayName, dayData]) => (
          <div key={dayName} className="mb-8 sm:mb-10">
            <div className="mb-4">
              <h2 className="text-white text-2xl font-bold leading-tight">{dayName}</h2>
              <p className="text-purple-200 text-sm">
                {moment(dayData.date).format('MMMM D, YYYY')}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {dayData.events.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  date={dayData.date}
                  colors={colors}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsPage
