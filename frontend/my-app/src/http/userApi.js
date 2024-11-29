import { $host, $authHost } from "./index";
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
        const { data } = await $authHost.get(`request/getAll`, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data.requests

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const getAllID = async () => {
    try {
        const { data } = await $authHost.get(`request/getAllID`, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data.users

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateAccess = async (id_request) => {
    try {
        const { data } = await $authHost.patch(`request/access`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                data: { id_request }
            }
        })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const updateDenied = async (id_request) => {
    try {
        const { data } = await $authHost.patch('request/denied', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
        const { data } = await $authHost.post('request/insert', {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            data: { car_number, description }
        })

        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}
