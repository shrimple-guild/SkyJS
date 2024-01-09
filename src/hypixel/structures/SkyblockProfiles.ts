import { APISkyblockProfile } from "../types/APIProfileTypes.js"
import { SkyblockProfile } from "./SkyblockProfile.js"
import { PlayerInfo } from "../../mojang/mojang.js"

export class SkyblockProfiles {
	readonly profiles: SkyblockProfile[]

	constructor(private player: PlayerInfo, profiles: APISkyblockProfile[]) {
		this.profiles = profiles.map(
			(profile) => new SkyblockProfile(this.player, profile)
		)
	}

	get selected() {
		return this.profiles.find((profile) => profile.selected)
	}

	get main() {
		return this.profiles.reduce((prev, cur) =>
			cur.member.skyblockLevel > prev.member.skyblockLevel ? cur : prev
		)
	}

	get bingo() {
		const profile = this.profiles.find((profile) => profile.gamemode == "bingo")
		if (profile == null) throw new Error("Profile does not exist.")
		return profile
	}

	get(name: string) {
		const profile = this.profiles.find(
			(profile) => profile.cuteName.toLowerCase() == name.toLowerCase()
		)
		if (profile == null) throw new Error("Profile does not exist.")
		return profile
	}

	getByQuery(query: string | undefined) {
		const queryLowercase = query?.toLowerCase()
		if (queryLowercase == "bingo") return this.bingo
		if (queryLowercase == "main") return this.main
		if (queryLowercase == null) return this.selected
		return this.get(queryLowercase)
	}
}
