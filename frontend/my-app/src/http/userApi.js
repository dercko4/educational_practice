import { $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const registration = async (login, password, FIO, phone, email) => {
    const { data } = await $host.post('auth/registration', { login, password, FIO, phone, email })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const auth = async (login, password) => {
    const { data } = await $host.post('auth/login', { login, password })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const getAll = async () => {
    try {
        const { data } = await $host.get(`request/getAll`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const getAllID = async () => {
    try {
        const { data } = await $host.get(`request/getAllID`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateAccess = async (id_request) => {
    try {
        const { data } = await $host.patch(`request/access`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                data: { id_request }
            }
        })
        return data.user_files

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const updateDenied = async (id_request) => {
    try {
        const { data } = await $host.patch('request/denied', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                data: { id_request }
            }
        })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const insertRequest = async (car_number, description) => {
    try {
        const { data } = await $host.post('request/insert', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }, { car_number, description })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}
