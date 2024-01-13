import { isName, isUuid, standardizeUuid } from "../utils/utils.js"
import {
	APIMinecraftPlayer,
	APIMojangProfileData,
	APIMojangSessionData,
	MinecraftPlayer
} from "./MojangTypes.js"
import { HttpError } from "../hypixel/errors/HttpError.js"
import { IllegalArgumentException } from "../hypixel/errors/IllegalArgumentException.js"
import { mojangAxios } from "../utils/axios.js"
import axios from "axios"

export const MojangService = {
	/**
	 * Get a user by either their UUID or their name.
	 * @param uuidOrName the UUID or name of a user.
	 * @returns The
	 * @throws an {@link IllegalArgumentException} if uuidOrName is invalid
	 * @throws an {@link IllegalArgumentException} if the Mojang API returns an error
	 */
	async get(uuidOrName: string): Promise<MinecraftPlayer | null> {
		let response: APIMinecraftPlayer | null
		if (isName(uuidOrName)) {
			response = await fetchMojangProfile(uuidOrName)
		} else if (isUuid(uuidOrName)) {
			response = await fetchMojangSession(uuidOrName)
		} else {
			throw new IllegalArgumentException("Not a valid username or UUID.")
		}
		if (response != null) {
			return { uuid: standardizeUuid(response.id)!, username: response.name }
		} else {
			return null
		}
	}
}

/**
 * Get the Mojang profile data from a username.
 * @param username the username to fetch the profile
 * @returns Mojang profile data, or null if no user exists for that username.
 * @throws a {@link MojangAPIError} if the Mojang API returns an error.
 */
async function fetchMojangProfile(username: string): Promise<APIMojangProfileData | null> {
	const normalized = username.toLocaleLowerCase()
	const url = `https://api.mojang.com/users/profiles/minecraft/${normalized}`
	const response = await mojangAxios.get<APIMojangProfileData>(url, {
		validateStatus: (status) => true
	})
	if (response.status == 200) {
		return response.data
	} else if (response.status == 404) {
		return null
	}
	throw new HttpError(response.statusText, response.status, url)
}

/**
 * Get the Mojang session data from a username.
 * @param username the username to fetch the profile
 * @returns Mojang profile data, or null if no user exists for that username.
 * @throws a {@link MojangAPIError} if the Mojang API returns an error.
 */
async function fetchMojangSession(uuid: string): Promise<APIMojangSessionData | null> {
	const normalized = standardizeUuid(uuid)
	const url = `https://sessionserver.mojang.com/session/minecraft/profile/${normalized}`
	const response = await mojangAxios.get<APIMojangSessionData>(url, {
		validateStatus: (status) => true
	})
	if (response.status == 200) {
		return response.data
	} else if (response.status == 204) {
		return null
	}
	throw new HttpError(response.statusText, response.status, url)
}
