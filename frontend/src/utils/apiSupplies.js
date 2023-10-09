import Axios from 'axios'

const apiSupplies = Axios.create({
   baseURL: 'http://127.0.0.1:8989/api/v1/supplies',
})

/*
    res = {
        status: 'success' | 'fail' | 'error',
        message: '...',
        data: {...}[] | {...} | null
    }
*/

export const getAllSupplies = async () => {
   const response = await apiSupplies.get('/')
   const res = response?.data

   return res
}

export const addSupply = async (data) => {
    const response = await apiSupplies.post('/', data)
    const res = response?.data
    
    return res
}

export const deleteSupply = async (id) => {
    const response = await apiSupplies.delete(`/${id}`)
    const res = response?.data

    return res
}