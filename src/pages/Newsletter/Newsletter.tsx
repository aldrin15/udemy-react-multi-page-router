import NewsletterSignup from '../../components/Newsletter/NewsletterSignup'
import PageContent from '../../components/Page/PageContent'

const NewsletterPage = () => {
    return (
        <PageContent title="Join our awesome newsletter">
            <NewsletterSignup />
        </PageContent>
    )
}

const action = async ({ request }: any) => {
    const data = await request.formData()
    const email = data.get('email')

    //Send to the backend newsletter server
    console.log(email)
    return { message: 'Signup successful' }
}

export default NewsletterPage
export { action }
