import { Form, NavLink, useRouteLoaderData } from 'react-router-dom'

import classes from './MainNavigation.module.css'
import NewsletterSignup from '../Newsletter/NewsletterSignup'

const MENU_NAVIGATION = [
    {
        id: 1,
        name: 'Home',
        url: '/',
    },
    {
        id: 2,
        name: 'Events',
        url: '/events',
    },
    {
        id: 3,
        name: 'Newsletter',
        url: '/newsletter',
    },
    {
        id: 4,
        name: 'Login / Signup',
        url: '/auth?mode=login',
    },
    {
        id: 5,
        name: 'Logout',
        url: '/logout',
    },
]

const MainNavigation = () => {
    const token = useRouteLoaderData('root') as string

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {MENU_NAVIGATION.map((menu) => {
                        const menuList = (
                            <li key={menu.id}>
                                <NavLink
                                    to={menu.url}
                                    className={({ isActive }) =>
                                        isActive ? classes.active : ''
                                    }
                                >
                                    {menu.name}
                                </NavLink>
                            </li>
                        )

                        if (token && menu.id === 4) {
                            return
                        }

                        if (
                            (token === null || token === 'EXPIRED') &&
                            menu.id === 5
                        ) {
                            return
                        }

                        if (token && menu.id === 5) {
                            return (
                                <li key={menu.id}>
                                    <Form action="/logout" method="post">
                                        <button>Logout</button>
                                    </Form>
                                </li>
                            )
                        }

                        return menuList
                    })}
                </ul>
            </nav>
            <NewsletterSignup />
        </header>
    )
}

export default MainNavigation
