import { Outlet } from 'react-router'
import MainNavigation from '../components/Navigation/MainNavigation'

const RootLayout = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout
