// @ts-nocheck

import bestiaryConstants from "./bestiary.json" assert { type: "json" }

type Brackets = {
	[key: number]: number[]
}

interface BestiaryFamily {
	category: string
	name: string
	cap: number
	mobs: string[]
	bracket: number
}

const { brackets, ...categories }: { brackets: Brackets } = bestiaryConstants

export function findMilestoneTier(kills: number, bracket: number) {
	let bracketKills = brackets[bracket]
	let highestTier = -1
	for (
		let tier = 0;
		tier <= bracketKills.length && kills >= bracketKills[tier];
		tier++
	) {
		highestTier = tier
	}
	return highestTier + 1
}

function flattenCategories(data: any): BestiaryFamily[] {
	const flattened: BestiaryFamily[] = []

	Object.values(data).forEach((value) => {
		if (typeof value !== "object") return
		if ("mobs" in value) {
			const mobs = value.mobs.map((mob) => ({
				category: value.name,
				name: mob.name,
				cap: mob.cap,
				bracket: mob.bracket,
				mobs: mob.mobs
			}))
			flattened.push(...mobs)
		} else if ("name" in value) {
			const result = flattenCategories(value)
			flattened.push(...result)
		}
	})

	return flattened
}

export const bestiaryFamilies = flattenCategories(categories)
