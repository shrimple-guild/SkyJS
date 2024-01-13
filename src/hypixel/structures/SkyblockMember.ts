import { APISkill, APISkyblockMember } from "../types/APIProfileTypesV2.js"
import { APIDisabledError } from "../errors/APIDisabledError.js"
import { Level } from "../../utils/Level.js"
import { skills } from "../../constants/leveling.js"

export class SkyblockMember {
	constructor(readonly raw: APISkyblockMember) {}

	getSkyblockLevel() {
		return (this.raw.leveling?.experience ?? 0) / 100
	}

	getFarmingLevelCap() {
		return 50 + (this.raw.jacobs_contest?.perks?.farming_level_cap ?? 0)
	}

	getSkill(skill: APISkill) {
		if (!this.isSkillAPIEnabled()) {
			throw new APIDisabledError("skills")
		}
		const xp = this.raw.player_data?.experience?.[skill] ?? 0
		if (skill == "SKILL_FARMING") {
			return skills[skill].calculateLevel(xp, this.getFarmingLevelCap())
		} else {
			return skills[skill].calculateLevel(xp)
		}
	}

	isSkillAPIEnabled() {
		return this.raw.player_data?.experience != null
	}
}
