type MemberAPITypes = "skills" | "collections" | "inventory" | "personal_bank" | "bank" | "museum"

export class APIDisabledError extends Error {
	api: MemberAPITypes

	constructor(api: MemberAPITypes) {
		super(`${api} disabled!`)
		this.api = api
		this.name = "APIDisabledError"
	}
}
