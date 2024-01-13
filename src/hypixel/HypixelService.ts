import { SkyblockProfiles } from "./structures/SkyblockProfiles.js"

import { hypixelAxios } from "../utils/axios.js"
import { APISkyblockProfilesResponse } from "./types/APIProfileTypesV2.js"
import { SkyblockProfile } from "./structures/SkyblockProfile.js"

const apiKey = process.env.HYPIXEL_API_KEY!

export const HypixelService = {
	getSkyblockProfiles: async (uuid: string): Promise<SkyblockProfiles | null> => {
		const response = await hypixelAxios.get<APISkyblockProfilesResponse>(`v2/skyblock/profiles`, {
			params: { uuid: uuid, key: apiKey }
		})
		const profiles = response.data.profiles
		if (profiles == null) {
			return null
		} else {
			return new SkyblockProfiles(uuid, profiles)
		}
	},

	getSkyblockProfile: async (uuid: string, strategy: string): Promise<SkyblockProfile | null> => {
		const profiles = await HypixelService.getSkyblockProfiles(uuid)
		if (profiles == null) {
			return null
		} else {
			return profiles.getByStrategy(strategy)
		}
	}
}

/*
function fetchHypixel(
	endpoint: string,
	authenticated: boolean = false,
	params?: Record<string, string>
) {
	const baseURL = new URL("https://api.hypixel.net/")
	const queryParameters = authenticated ? { ...params, key: process.env.HYPIXEL_API_KEY! } : params
	const url = new URL(baseURL)
	url.pathname = endpoint
	url.search = new URLSearchParams(queryParameters).toString()
	return fetch(url)
}

export async function fetchBazaar(): Promise<SkyblockBazaarProduct[]> {
	const response = await fetchHypixel("/skyblock/bazaar", true)

	if (response.status != 200) {
		throw new HttpError("API error", response.status)
	}

	const apiBazaarData: APISkyblockBazaarResponse = (await response.json()) as any

	const products = Object.values(apiBazaarData.products)

	return []
}

export async function fetchHypixelProfiles(input: string): Promise<SkyblockProfiles> {
	const player = await MojangService.get(input)

	if (player == null) {
		throw new HttpError("No Minecraft player found for the provided UUID", 404)
	}

	const response = await fetchHypixel("/skyblock/profiles", true, {
		uuid: player.uuid
	})

	if (response.status >= 500) {
		throw new HttpError("Server error", response.status)
	}

	if (response.status >= 400 && response.status < 500) {
		const responseData: any = await response.json()
		const cause = responseData.cause
		throw new HttpError(`Error: ${cause}`, response.status)
	}

	const data: APISkyblockProfilesResponse = (await response.json()) as any

	if (data.profiles == null) {
		throw new HttpError("No profiles found for the provided UUID", 404)
	}

	return new SkyblockProfiles(player, data.profiles)
}

*/
