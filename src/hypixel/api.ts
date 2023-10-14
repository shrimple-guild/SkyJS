import { HypixelAPIError } from "./errors/HypixelAPIError"
import { APISkyblockProfilesResponse } from "./types/APIProfileTypes"
import { SkyblockProfiles } from "./structures/SkyblockProfiles"
import { resolve } from "../mojang/mojang"
import { SkyblockBazaarProduct } from "./types/SkyblockBazaarTypes"
import { APISkyblockBazaarResponse } from "./types/APIBazaarTypes"

function fetchHypixel(endpoint: string, authenticated: boolean = false, params?: Record<string, string>) {
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
    throw new HypixelAPIError("API error", response.status)
  }

  const apiBazaarData: APISkyblockBazaarResponse = (await response.json()) as any

  const products = Object.values(apiBazaarData.products)

  return []
}

export async function fetchHypixelProfiles(input: string): Promise<SkyblockProfiles> {
  const name = await resolve(input)
  const response = await fetchHypixel("/skyblock/profiles", true, { uuid: name.uuid })

  if (response.status >= 500) {
    throw new HypixelAPIError("Server error", response.status)
  }

  if (response.status >= 400 && response.status < 500) {
    const responseData: any = await response.json()
    const cause = responseData.cause
    throw new HypixelAPIError(`Error: ${cause}`, response.status)
  }

  const data: APISkyblockProfilesResponse = (await response.json()) as any

  if (data.profiles == null) {
    throw new HypixelAPIError("No profiles found for the provided UUID", 404)
  }

  return new SkyblockProfiles(name, data.profiles)
}
