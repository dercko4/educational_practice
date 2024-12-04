import { $host, $authHost } from "./index";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

export const registration = async (login, password, FIO, phone, email) => {
    try {
        const { data } = await $host.post('auth/registration', { login, password, FIO, phone, email })
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (error) {
        alert(error.response.data.message)
        return
    }
}

export const auth = async (login, password) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, { login, password })
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (error) {
        alert(error.response.data.message)
        return
    }
}

export const getAll = async () => {
    try {
        const { data } = await $authHost('request/getall')
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const getAllID = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}request/getAllID`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateAccess = async (id_request) => {
    try {
        const { data } = await $authHost.patch(`request/access`, { id_request }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data
    } catch (e) {
        alert(e.response.data.message)
    }
}
export const updateDenied = async (id_request) => {
    try {
        const { data } = await $authHost.patch(`${process.env.REACT_APP_API_URL}request/denied`, { id_request },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        return data

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const insertRequest = async (car_number, description) => {
    try {
        const { data } = await $authHost.post('request/insert', { car_number, description }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return data
    } catch (e) {
        alert(e.response.data.message)
    }
}
