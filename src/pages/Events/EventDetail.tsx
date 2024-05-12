import { useRouteLoaderData, json, defer, redirect } from 'react-router'

import { Event } from '../../interfaces/Event'
import EventItem from '../../components/Events/EventItem'

const url: string = 'http://localhost:8080'

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-detail') as Event

    return <EventItem event={data.event} />
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

const loader = async ({ request, params }: any) => {
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
