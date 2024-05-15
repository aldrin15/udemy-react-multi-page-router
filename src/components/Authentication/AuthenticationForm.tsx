import { useActionData, useNavigation } from 'react-router'
import { Form, Link, useSearchParams } from 'react-router-dom'

import classes from './AuthenticationForm.module.css'
import { Errors } from '../../interfaces/Errors'

const AuthenticationForm = () => {
    const data = useActionData() as Errors
    const navigation = useNavigation()

    const [searchParams] = useSearchParams()
    const isLogin = searchParams.get('mode') === 'login'
    const isSubmitting = navigation.state === 'submitting'

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? 'Log In' : 'Create a new user'}</h1>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </p>
                <div className={classes.actions}>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Create New User' : 'Login'}
                    </Link>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                    </button>
                </div>
            </Form>
        </>
    )
}

export default AuthenticationForm
