import {
	findMilestoneTier,
	bestiaryFamilies
} from "../../constants/bestiary.js"
import { removeFormatting } from "../../utils/utils.js"
import { SkyblockBestiaryData } from "../types/SkyblockProfileTypes.js"
import { APISkyblockMember } from "../types/APIProfileTypes.js"

export function generateBestiary(
	member: APISkyblockMember
): SkyblockBestiaryData | undefined {
	if (!member.bestiary) return undefined
	if (!member.bestiary.migration) return undefined
	const bestiary = member.bestiary.kills ?? {}
	const bestiaryTiers = bestiaryFamilies.map((family) => {
		const kills = family.mobs.reduce(
			(cum, cur) => cum + (bestiary[cur] ?? 0),
			0
		)
		const tierKills = Math.min(kills, family.cap)
		return {
			category: family.category,
			name: removeFormatting(family.name),
			maxed: kills >= family.cap,
			tier: findMilestoneTier(tierKills, family.bracket),
			kills: kills
		}
	})
	const bestiaryMilestone = bestiaryTiers.reduce(
		(sum, mob) => (mob.tier ?? 0) + sum,
		0
	)
	return {
		milestone: bestiaryMilestone / 10,
		claimedMilestone: member.bestiary.milestone?.last_claimed_milestone ?? 0,
		tiers: bestiaryTiers
	}
}
