export interface EventItems {
    id: number
    image: string
    title: string
    date: string
    description: string
}

export interface Event {
    event: EventItems
}

export interface Events {
    events: [EventItems]
    event?: []
}

export interface EventsForm {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
    event?: EventItems
}
