import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/Root'
import HomePage from './pages/Home/Home'
import EventsRootLayout from './pages/Events/EventsRoot'
import EventsPage, { loader as EventsLoader } from './pages/Events/Events'
import EventDetailPage, {
    loader as EventsDetailLoader,
    action as EventDetailAction,
} from './pages/Events/EventDetail'
import { action as manipulateEventAction } from './components/Events/EventForm'
import NewsletterPage, {
    action as newsletterAction,
} from './pages/Newsletter/Newsletter'
import EventNewPage from './pages/Events/EventNew'
import EventEditPage from './pages/Events/EventEdit'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'events',
                element: <EventsRootLayout />,
                children: [
                    {
                        index: true,
                        element: <EventsPage />,
                        loader: EventsLoader,
                    },
                    {
                        path: ':eventId',
                        id: 'event-detail',
                        loader: EventsDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <EventDetailPage />,
                                action: EventDetailAction,
                            },
                            {
                                path: 'edit',
                                element: <EventEditPage />,
                                action: manipulateEventAction,
                            },
                        ],
                    },
                    {
                        path: 'new',
                        element: <EventNewPage />,
                        action: manipulateEventAction,
                    },
                ],
            },
            {
                path: 'newsletter',
                element: <NewsletterPage />,
                action: newsletterAction,
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
