import { EventItems } from './Event'

export interface Props {
    children?: string | JSX.Element | JSX.Element[]
    title?: string
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
    event?: EventItems
}
