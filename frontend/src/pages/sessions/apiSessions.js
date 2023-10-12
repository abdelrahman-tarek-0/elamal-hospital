import Axios from 'axios'

const apiSessions = Axios.create({
    baseURL: 'http://127.0.0.1:8989/api/v1/sessions',
})

export const getAllSessions = async () => {
    const response = await apiSessions.get('/')
    const res = response?.data

    return res
}

export const createSession = async (data) => {
    const response = await apiSessions.post('/', data)
    const res = response?.data

    return res
}