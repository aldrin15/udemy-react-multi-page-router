import { useRouteError } from 'react-router-dom'

import PageContent from '../../components/Page/PageContent'
import MainNavigation from '../../components/Navigation/MainNavigation'

import { Errors } from '../../interfaces/Errors'

const ErrorPage = () => {
    const error = useRouteError() as Errors

    let title: string = 'An error occured!'
    let message = 'Something went wrong'

    if (error.status === 500) {
        message = error.data.message
    }

    if (error.status === 404) {
        title = 'Not Found!'
        message = 'Could not find resource or page'
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage
