import { skills } from "../../constants/leveling.js"
import { SkyblockProfile } from "../structures/SkyblockProfile.js"
import {
	APISkyblockMember,
	APISkyblockProfile
} from "../types/APIProfileTypes.js"

export function generateSkills(member: APISkyblockMember) {
	if (!isSkillsApiEnabled(member)) return undefined
	const farmingCap = 50 + (member.jacob2?.perks?.farming_level_cap ?? 0)
	return {
		farming: skills.farming.calculateLevel(
			member.experience_skill_farming ?? 0,
			farmingCap
		),
		mining: skills.mining.calculateLevel(member.experience_skill_mining ?? 0),
		combat: skills.combat.calculateLevel(member.experience_skill_combat ?? 0),
		foraging: skills.foraging.calculateLevel(
			member.experience_skill_foraging ?? 0
		),
		fishing: skills.fishing.calculateLevel(
			member.experience_skill_fishing ?? 0
		),
		enchanting: skills.enchanting.calculateLevel(
			member.experience_skill_enchanting ?? 0
		),
		alchemy: skills.alchemy.calculateLevel(
			member.experience_skill_alchemy ?? 0
		),
		taming: skills.taming.calculateLevel(member.experience_skill_taming ?? 0),
		carpentry: skills.carpentry.calculateLevel(
			member.experience_skill_carpentry ?? 0
		),
		runecrafting: skills.runecrafting.calculateLevel(
			member.experience_skill_runecrafting ?? 0
		),
		social: skills.social.calculateLevel(member.experience_skill_social2 ?? 0)
	}
}

function isSkillsApiEnabled(member: APISkyblockMember): boolean {
	return [
		member.experience_skill_farming,
		member.experience_skill_mining,
		member.experience_skill_combat,
		member.experience_skill_foraging,
		member.experience_skill_fishing,
		member.experience_skill_enchanting,
		member.experience_skill_alchemy,
		member.experience_skill_taming,
		member.experience_skill_carpentry,
		member.experience_skill_runecrafting
	].some((xp) => xp != undefined)
}
