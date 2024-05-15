import { redirect } from 'react-router'

const Logout = () => {
    return <></>
}

const action = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')

    return redirect('/')
}

export default Logout

export { action }
