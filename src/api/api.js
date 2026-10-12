import axios from "axios";
import { useUserStore } from "../store/useUserStore";


const apiInstance = axios.create({
    baseURL: "https://api.kitek-pg.ru/api/marketplace/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
})

apiInstance.interceptors.request.use((config) => {
    const {session} = useUserStore.getState()
    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const getItems = async () => {
    const res = await apiInstance.get("/items")
    return res
}

const sendItems = async (item) => {
    const res = await apiInstance.post("/items", item)
    return res
}

const getBids = async (id) => {
    const res = await apiInstance.get(`/items/${id}/bids`)
    return res
}

const getStats = async () => {
    const res = await apiInstance.get(`/stats`)
    return res
}

const authMe = async () => {
    const res = await apiInstance.get("/auth/me")
    return res
}

const deleteItem = async (id) => {
    const res = await apiInstance.delete(`/items/${id}`)
    return res
}

const sendBid = async (id) => {
    const res = await apiInstance.post(`/items/${id}/bids`)
    return res
}

const getMyBids = async () => {
    const res = await apiInstance.get(`/bids/my`)
    return res
}

export const api = {
    registerUser,
    loginUser,
    getItems,
    sendItems,
    getBids,
    getStats,
    authMe,
    deleteItem,
    sendBid,
    getMyBids
}