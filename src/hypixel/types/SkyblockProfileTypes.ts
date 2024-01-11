import { PlayerInfo } from "../../mojang/mojang.js"

export type SkyblockProfileData = {
	player: PlayerInfo
	profileId: string
	members: string[]
	bankBalance?: number
	cuteName: string
	selected: boolean
	member: SkyblockMemberData
}

export type SkyblockMemberData = {
	skills?: SkyblockMemberSkills
	slayers: SkyblockMemberSlayers
	dungeons: {
		level: LevelData
		classes: {
			healer: LevelData
			mage: LevelData
			archer: LevelData
			tank: LevelData
			berserk: LevelData
		}
		floors: {
			entrance: SkyblockDungeonFloorData
			floor1: SkyblockDungeonFloorData
			floor2: SkyblockDungeonFloorData
			floor3: SkyblockDungeonFloorData
			floor4: SkyblockDungeonFloorData
			floor5: SkyblockDungeonFloorData
			floor6: SkyblockDungeonFloorData
			floor7: SkyblockDungeonFloorData
			masterMode1: SkyblockDungeonFloorData
			masterMode2: SkyblockDungeonFloorData
			masterMode3: SkyblockDungeonFloorData
			masterMode4: SkyblockDungeonFloorData
			masterMode5: SkyblockDungeonFloorData
			masterMode6: SkyblockDungeonFloorData
			masterMode7: SkyblockDungeonFloorData
		}
		collection: {
			bonzo: number
			scarf: number
			professor: number
			thorn: number
			livid: number
			sadan: number
			necron: number
		}
	}
	bestiary?: SkyblockBestiaryData
	trophyFish?: SkyblockTrophyFishData
}

export type SkyblockTrophyFishData = {
	total: number
	trophyHunter: string | undefined
	fish: {
		fish: string
		tier: string | undefined
		count: number
		tiers: Record<string, number>
	}[]
}

export type SkyblockBestiaryData = {
	milestone: number
	claimedMilestone: number
	tiers: BestiaryMob[]
}

export type BestiaryMob = {
	category: string
	name: string
	tier: number
	kills: number
	maxed: boolean
}

export type SkyblockDungeonBossData = {
	collection: number
	timesPlayed: number
	watcherKills: number
}

export type SkyblockDungeonFloorData = {
	tierCompletions: number
	milestoneCompletions: number
	fastestTime: number
	fastestTimeS: number
	fastestTimeSPlus: number
	bestScore: number
	mobsKilled: number
	mostMobsKilled: number
	mostDamageTank: number
	mostDamageBerserk: number
	mostDamageHealer: number
	mostDamageMage: number
	mostDamageArcher: number
	mostHealing: number
}

export type SkyblockMemberSkills = {
	farming: LevelData
	mining: LevelData
	combat: LevelData
	foraging: LevelData
	fishing: LevelData
	enchanting: LevelData
	alchemy: LevelData
	taming: LevelData
	carpentry: LevelData
	runecrafting: LevelData
	social: LevelData
}

export type SkyblockMemberSlayers = {
	zombie: SkyblockMemberSlayerData
	spider: SkyblockMemberSlayerData
	wolf: SkyblockMemberSlayerData
	enderman: SkyblockMemberSlayerData
	blaze: SkyblockMemberSlayerData
	vampire: SkyblockMemberSlayerData
}

export type SkyblockMemberSlayerData = {
	level: LevelData
	kills: number[]
}

export interface LevelData {
	level: number
	xp: number
	maxed: boolean
	xpOverLevel: number
	xpToNext?: number
	cap?: number
}
