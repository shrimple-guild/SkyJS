import { SkyblockTrophyFishData } from "../types/SkyblockProfileTypes.js"
import { APISkyblockMember, OptionalRecord } from "../types/APIProfileTypes.js"

const fishNames = [
	{ apiName: "sulphur_skitter", cuteName: "Sulphur Skitter" },
	{ apiName: "obfuscated_fish_1", cuteName: "Obfuscated 1" },
	{ apiName: "steaming_hot_flounder", cuteName: "Steaming-Hot Flounder" },
	{ apiName: "obfuscated_fish_2", cuteName: "Obfuscated 2" },
	{ apiName: "gusher", cuteName: "Gusher" },
	{ apiName: "blobfish", cuteName: "Blobfish" },
	{ apiName: "slugfish", cuteName: "Slugfish" },
	{ apiName: "obfuscated_fish_3", cuteName: "Obfuscated 3" },
	{ apiName: "flyfish", cuteName: "Flyfish" },
	{ apiName: "lava_horse", cuteName: "Lavahorse" },
	{ apiName: "mana_ray", cuteName: "Mana Ray" },
	{ apiName: "volcanic_stonefish", cuteName: "Volcanic Stonefish" },
	{ apiName: "vanille", cuteName: "Vanille" },
	{ apiName: "skeleton_fish", cuteName: "Skeleton Fish" },
	{ apiName: "moldfin", cuteName: "Moldfin" },
	{ apiName: "soul_fish", cuteName: "Soul Fish" },
	{ apiName: "karate_fish", cuteName: "Karate Fish" },
	{ apiName: "golden_fish", cuteName: "Golden Fish" }
]

const tiers = ["bronze", "silver", "gold", "diamond"]

type Tier = (typeof tiers)[number]

export function generateTrophyFish(member: APISkyblockMember): SkyblockTrophyFishData {
	const trophyFish = member.trophy_fish ?? { rewards: [] }
	const { rewards, ...counts }: { rewards: number[] } = trophyFish
	const trophyFishCounts: OptionalRecord<string, number> = counts
	const claimedTier = rewards.length != 0 ? tiers[Math.max(...rewards) - 1] : undefined
	const fish = fishNames.map((name) => {
		let highestTier: Tier | undefined = undefined
		const tierCounts: Record<Tier, number> = Object.fromEntries(
			tiers.map((tier) => {
				const key = `${name.apiName}_${tier}`
				const count = trophyFishCounts[key] ?? 0
				if (count > 0) highestTier = tier
				return [tier, count]
			})
		)
		return {
			fish: name.cuteName,
			tier: highestTier,
			count: Object.values(tierCounts).reduce((a, b) => a + b, 0),
			tiers: tierCounts
		}
	})

	return {
		total: trophyFishCounts["total_caught"] ?? 0,
		trophyHunter: claimedTier,
		fish
	}
}
