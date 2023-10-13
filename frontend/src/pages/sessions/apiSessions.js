import Axios from 'axios'

const apiSessions = Axios.create({
    baseURL: 'http://127.0.0.1:8989/api/v1/sessions',
})

export const getAllSessions = async () => {
    const response = await apiSessions.get('/')
    const res = response?.data

    return res
}

export const createSession = async (name) => {
    const response = await apiSessions.post('/', { name })
    const res = response?.data

    return res
}

export const deleteSession = async (id) => {
    const response = await apiSessions.delete(`/${id}`)
    const res = response?.data

    return res
}

export const updateSession = async (id, newData) => {
    const response = await apiSessions.patch(`/${id}`, newData)
    const res = response?.data

    return res
}

export const checkSession = async (id) => {
    const response = await apiSessions.get(`/${id}/check`)
    const res = response?.data

    return res
}