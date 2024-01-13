import { standardizeUuid, trimUuid } from "../../utils/utils.js"
import { APISkyblockProfile } from "../types/APIProfileTypes.js"
import { SkyblockMember } from "./SkyblockMember.js"

export class SkyblockProfile {
	constructor(readonly uuid: string, readonly raw: APISkyblockProfile) {}

	get member() {
		const rawMember = this.raw.members[trimUuid(this.uuid)]
		if (rawMember == null) {
			throw Error(`Member ${this.uuid} is somehow not part of profile ${this.profileId}.`)
		}
		return new SkyblockMember(rawMember)
	}

	get gamemode() {
		return this.raw.game_mode
	}

	get cuteName() {
		return this.raw.cute_name
	}

	get profileId() {
		const uuid = standardizeUuid(this.raw.profile_id)
		if (uuid == null) {
			throw Error("The profile ID is not a UUID.")
		}
		return uuid
	}

	get members() {
		return Object.keys(this.raw.members)
	}

	get selected() {
		return this.raw.selected
	}

	json() {
		return {
			profile_id: this.profileId,
			selected: this.selected,
			cute_name: this.cuteName,
			members: this.members,
			member: this.member
		}
	}
}
