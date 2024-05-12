import { useRouteLoaderData } from 'react-router'

import { Event } from '../../interfaces/Event'
import EventForm from '../../components/Events/EventForm'

const EventEditPage = () => {
    const data = useRouteLoaderData('event-detail') as Event

    return <EventForm method="patch" event={data.event} />
}

export default EventEditPage
