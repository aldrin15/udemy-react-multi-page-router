import { useRouteLoaderData, json, defer, redirect, Await } from 'react-router'

import { Events } from '../../interfaces/Event'
import EventItem from '../../components/Events/EventItem'
import { Suspense } from 'react'
import EventList from '../../components/Events/EventList'

const url: string = 'http://localhost:8080'

const EventDetailPage = () => {
    const { event, events } = useRouteLoaderData('event-detail') as Events

    return (
        <>
            <Suspense
                fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
            >
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense
                fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}
            >
                <Await resolve={events}>
                    {(loadedEvents) => <EventList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

const loadEvent = async (id: number) => {
    const response = await fetch(`${url}/events/` + id)

    if (!response.ok) {
        throw json(
            {
                message: 'Could not fetch details for selected event.',
            },
            { status: 500 }
        )
    } else {
        const resData = await response.json()

        return resData.event
    }
}

const loadEvents = async () => {
    const response = await fetch(`${url}/events`)

    if (!response.ok) {
        throw json(
            {
                message: 'Could not fetch events.',
            },
            { status: 500 }
        )
    } else {
        const resData = await response.json()

        return resData.events
    }
}

const loader = async ({ params }: any) => {
    const id = params.eventId

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    })
}

const action = async ({ params, request }: any) => {
    const response = await fetch(`${url}/events/` + params.eventId, {
        method: request.method,
    })

    if (!response.ok) {
        throw json(
            {
                message: 'Could not delete event.',
            },
            { status: 500 }
        )
    }

    return redirect('/events')
}

export default EventDetailPage
export { loadEvent, loadEvents, loader, action }
