const { NotFoundError } = require('../util/errors')
const { readData, writeData } = require('./util')

async function getAll() {
    const storedData = await readData()
    if (!storedData.events) {
        throw new NotFoundError('Could not find any events.')
    }
    return storedData.events
}

async function get(id) {
    const storedData = await readData()
    if (!storedData.events || storedData.events.length === 0) {
        throw new NotFoundError('Could not find any events.')
    }

    const event = storedData.events.find((ev) => ev.id === Number(id))
    if (!event) {
        throw new NotFoundError('Could not find event for id ' + Number(id))
    }

    return event
}

async function add(data) {
    const storedData = await readData()
    const randomId = Math.floor(Math.random() * 10 + 2)

    storedData.events.unshift({ ...data, id: randomId })
    await writeData(storedData)
}

async function replace(id, data) {
    const storedData = await readData()
    if (!storedData.events || storedData.events.length === 0) {
        throw new NotFoundError('Could not find any events.')
    }

    const index = storedData.events.findIndex(
        (event) => event.id === Number(id)
    )

    if (index < 0) {
        throw new NotFoundError('Could not find event for id ' + Number(id))
    }

    storedData.events[index] = { ...data, id: Number(id) }

    await writeData(storedData)
}

async function remove(id) {
    const storedData = await readData()
    const updatedData = storedData.events.filter(
        (event) => event.id !== Number(id)
    )

    await writeData({ ...storedData, events: updatedData })
}

exports.getAll = getAll
exports.get = get
exports.add = add
exports.replace = replace
exports.remove = remove
