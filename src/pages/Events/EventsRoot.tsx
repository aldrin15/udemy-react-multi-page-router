import { Outlet } from 'react-router'
import EventsNavigation from '../../components/Events/EventsNavigation'

const EventsRoot = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    )
}

export default EventsRoot
