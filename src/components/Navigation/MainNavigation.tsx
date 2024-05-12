import { NavLink } from 'react-router-dom'

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
]

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {MENU_NAVIGATION.map((menu) => (
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
                    ))}
                </ul>
            </nav>
            <NewsletterSignup />
        </header>
    )
}

export default MainNavigation
