import { describe, it } from "node:test"
import assert from "node:assert"
import { MojangService } from "../mojang/MojangService.js"

describe("MojangService", () => {
	it("should return a user object when provided a valid UUID", async () => {
		const uuid = "59998433ceda41c1b0acffe7d9b33594"

		const result = await MojangService.get(uuid)
		assert.deepStrictEqual(result, {
			uuid: "59998433-ceda-41c1-b0ac-ffe7d9b33594",
			username: "appable"
		})
	})

	it("should return a user object when provided a valid name", async () => {
		const username = "Appable"

		const result = await MojangService.get(username)
		assert.deepStrictEqual(result, {
			uuid: "59998433-ceda-41c1-b0ac-ffe7d9b33594",
			username: "appable"
		})
	})

	it("should throw an error on malformed names or UUIDs", async () => {
		const malformedUuid = "59998433ceda41c1b0acffe7d9b3"
		await assert.rejects(MojangService.get(malformedUuid))
	})
})
