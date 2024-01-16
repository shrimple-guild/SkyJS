import { describe, it } from "node:test"
import assert from "node:assert"
import { standardizeUuid } from "../utils/utils.js"

describe("standardizeUuid function", () => {
	it("should return a standardized UUID when input is valid", () => {
		const validUuids = {
			"550e8400e29b41d4a716446655440000": "550e8400-e29b-41d4-a716-446655440000",
			"123E4567-E89B-12D3-A456-426614174001": "123e4567-e89b-12d3-a456-426614174001",
			"59998433-ceda-41c1-b0ac-ffe7d9b33594": "59998433-ceda-41c1-b0ac-ffe7d9b33594"
		}

		Object.entries(validUuids).forEach(([uuid, standardized]) => {
			const result = standardizeUuid(uuid)
			assert.strictEqual(result, standardized, `Expected ${uuid}, but got ${result}`)
		})
	})

	it("should return undefined for invalid UUIDs", () => {
		const invalidUuids = [
			"not-a-uuid",
			"12345",
			"qqqqqqqq-3456-7890-abcd-ef123456789",
			"abcdef12-3456-7890-abcd-ef12345678",
			"abcdef12-3456-7890-abcd-ef12345678901"
		]

		invalidUuids.forEach((uuid) => {
			assert.throws(() => standardizeUuid(uuid))
		})
	})
})
