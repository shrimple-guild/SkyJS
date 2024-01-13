export type APISkyblockProfilesResponse = {
	success: boolean
	profiles: APISkyblockProfile[] | null
}

export interface APISkyblockProfile {
	profile_id: string
	community_upgrades: any
	members: Record<string, APISkyblockMember>
	banking?: {
		balance: number
	}
	game_mode: string
	cute_name: string
	selected: boolean
}

export interface APISkyblockMember {
	player_data?: APISkyblockMemberPlayerData
	accessory_bag_storage?: {
		highest_magical_power: number
	}
	leveling?: APISkyblockMemberLevelingData
	jacobs_contest?: APISkyblockMemberJacobData
	currencies?: APISkyblockMemberCurrenciesData
	dungeons?: any
	profile?: any
	player_id: string
	nether_island_player_data?: any
	experimentation?: any
	mining_core?: any
	pets_data?: any
	bestiary?: any
	quests?: any
	player_stats?: any
	forge?: any
	fairy_soul: any
	objectives: any
	slayer: any
	trophy_fish: any
	inventory: any
	collection: any
}

export interface APISkyblockMemberCurrenciesData {
	coin_purse: number
	motes_purse?: number
	essence?: Record<APIEssence, { current: number }>
}

export interface APISkyblockMemberJacobData {
	medals_inv: {
		bronze: number
		silver: number
		gold: number
	}
	perks: {
		double_drops: number
		farming_level_cap: number
		personal_bests: boolean
	}
	contests: Record<string, APIJacobContestData>
}

export interface APIJacobContestData {
	collected: number
	claimed_medal?: string
	claimed_participants?: number
	claimed_position?: number
	claimed_rewards?: number
}

export interface APISkyblockMemberLevelingData {
	experience: number
	highest_pet_score: number
	fishing_festival_sharks_killed: number
	migrated: boolean
	migrated_completions_2: boolean
	mining_fiesta_ores_mined: number
}

export interface APISkyblockMemberPlayerData {
	unlocked_coll_tiers: string[]
	crafted_generators: string[]
	fishing_treasure_caught: number
	experience: Record<APISkill, number>
}

export type APIEssence =
	| "DRAGON"
	| "WITHER"
	| "DIAMOND"
	| "SPIDER"
	| "UNDEAD"
	| "GOLD"
	| "ICE"
	| "CRIMSON"

export type APISkill =
	| "SKILL_FISHING"
	| "SKILL_ALCHEMY"
	| "SKILL_RUNECRAFTING"
	| "SKILL_MINING"
	| "SKILL_FARMING"
	| "SKILL_ENCHANTING"
	| "SKILL_TAMING"
	| "SKILL_FORAGING"
	| "SKILL_SOCIAL"
	| "SKILL_CARPENTRY"
	| "SKILL_COMBAT"
