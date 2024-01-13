import axios from "axios"
import { setupCache } from "axios-cache-interceptor"

const mojangInstance = axios.create({
	baseURL: "",
	timeout: 2000
})

export const mojangAxios = setupCache(mojangInstance, {
	ttl: 1000 * 60 * 60 * 24,
	interpretHeader: false
})

const hypixelInstance = axios.create({
	baseURL: "https://api.hypixel.net/",
	timeout: 2000
})

export const hypixelAxios = setupCache(hypixelInstance, {
	ttl: 1000 * 60,
	interpretHeader: false
})
