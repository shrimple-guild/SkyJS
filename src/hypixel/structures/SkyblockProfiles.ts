import { APISkyblockProfile } from "../types/APIProfileTypesV2.js"
import { SkyblockProfile } from "./SkyblockProfile.js"

export class SkyblockProfiles {
	readonly profiles: SkyblockProfile[]

	constructor(private uuid: string, profiles: APISkyblockProfile[]) {
		this.profiles = profiles.map((profile) => new SkyblockProfile(this.uuid, profile))
	}

	get selected() {
		return this.profiles.find((profile) => profile.selected) ?? null
	}

	get main() {
		return this.profiles.reduce((prev, cur) =>
			cur.member.getSkyblockLevel() > prev.member.getSkyblockLevel() ? cur : prev
		)
	}

	get bingo() {
		const profile = this.profiles.find((profile) => profile.gamemode == "bingo")
		if (profile == null) throw new Error("Profile does not exist.")
		return profile
	}

	getByCuteName(name: string) {
		return (
			this.profiles.find((profile) => profile.cuteName.toLowerCase() == name.toLowerCase()) ?? null
		)
	}

	getByStrategy(query: string) {
		const queryLowercase = query?.toLowerCase()
		if (queryLowercase == "bingo") return this.bingo
		if (queryLowercase == "main") return this.main
		if (queryLowercase == "selected") return this.selected
		return this.getByCuteName(queryLowercase)
	}
}
