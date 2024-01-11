import { isName, standardizeUuid } from "../utils/utils.js"
import { MojangAPI } from "./MojangAPI.js"
import { MojangCache } from "./MojangCache.js"

class MojangService {
	private cache: MojangCache
	private api: MojangAPI

	constructor(cache: MojangCache, api: MojangAPI) {
		this.cache = cache
		this.api = api
	}

	async getUser(uuidOrName: string, maxAge: number) {
		if (isName(uuidOrName)) {
			const uuid = await this.cache.getUuid(uuidOrName)
		} else {
			const uuid = standardizeUuid(uuidOrName)
		}
	}

	getUserWithSkin(uuidOrName: string, maxAge: number) {}
}
