import { describe, it } from "node:test"
import assert from "node:assert"

import { Redis } from "ioredis"
import { MojangCache } from "../redis/MojangCache.js"

export const redisClient = new Redis({
	keyPrefix: "skyjstesting:"
})

const cache = new MojangCache(redisClient, 1, 5)

describe("Set cache name", async () => {
	await cache.setName("59998433ceda41c1b0acffe7d9b33594", "appable")
	const name = await cache.getName("59998433ceda41c1b0acffe7d9b33594")
	assert.deepStrictEqual(name, {
		value: "appable",
		fresh: true
	})

	const notAName = await cache.getName("93ce1cad833f46ffa124b66d2b99c4fd")
	assert.equal(notAName, null)

	await new Promise<void>((resolve) => {
		setTimeout(async () => {
			const staleName = await cache.getName("59998433ceda41c1b0acffe7d9b33594")
			assert.deepStrictEqual(staleName, {
				value: "appable",
				fresh: false
			})
			resolve()
		}, 2000)
	})

	await new Promise<void>((resolve) => {
		setTimeout(async () => {
			const deletedName = await cache.getName(
				"59998433ceda41c1b0acffe7d9b33594"
			)
			assert.equal(deletedName, null)
			resolve()
		}, 6000)
	})
})
