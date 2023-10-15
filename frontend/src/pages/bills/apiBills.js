import Axios from 'axios'

const apiSessions = Axios.create({
    baseURL: 'http://127.0.0.1:8989/api/v1/bills',
})

export const getAllBills = async () => {
    const response = await apiSessions.get('/')
    const res = response?.data

    return res
}
