import { Suspense } from 'react'
import { Await, useLoaderData, json, defer } from 'react-router-dom'
import EventList from '../../components/Events/EventList'

import { Events } from '../../interfaces/Event'

const EventsPage = () => {
    const { events } = useLoaderData() as Events

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventList events={loadedEvents} />}
            </Await>
        </Suspense>
    )
}

const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events')

    if (!response.ok) {
        throw json(
            {
                message: 'Could not fetch events.',
            },
            {
                status: 500,
            }
        )
    } else {
        const resData = await response.json()

        return resData.events
    }
}

const loader = () => {
    return defer({
        events: loadEvents(),
    })
}

export default EventsPage
export { loadEvents, loader }
