import classes from './PageContent.module.css'

import { Props } from '../../interfaces/Props'

const PageContent = ({ title, children }: Props) => {
    return (
        <div className={classes.content}>
            <h1>{title}</h1>

            {children}
        </div>
    )
}

export default PageContent
