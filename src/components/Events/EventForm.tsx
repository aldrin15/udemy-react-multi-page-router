import {
    useNavigate,
    Form,
    useNavigation,
    json,
    redirect,
    useActionData,
} from 'react-router-dom'

import classes from './EventForm.module.css'
import { Props } from '../../interfaces/Props'
import { Errors } from '../../interfaces/Errors'

const EventForm = ({ method, event }: Props) => {
    const data = useActionData() as Errors
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'

    const cancelHandler = () => {
        navigate('..')
    }

    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={event ? event.title : ''}
                    required
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                    defaultValue={event ? event.image : ''}
                    required
                />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    defaultValue={event ? event.date : ''}
                    required
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    defaultValue={event ? event.description : ''}
                    required
                />
            </p>

            <div className={classes.actions}>
                <button
                    type="button"
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </Form>
    )
}

const action = async ({ request, params }: any) => {
    const method = request.method
    const data = await request.formData()
    let eventUrl: string = 'http://localhost:8080/events'

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }

    if (method === 'PATCH') {
        const eventId = params.eventId

        eventUrl = `${eventUrl}/${eventId}`
    }

    const response = await fetch(eventUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })

    if (response.status === 422) {
        return response
    }

    if (!response.ok) {
        throw json({ message: 'Could not save events.' }, { status: 500 })
    }

    return redirect('/events')
}

export default EventForm
export { action }
