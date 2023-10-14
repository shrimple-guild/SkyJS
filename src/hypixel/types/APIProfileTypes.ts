export interface APISkyblockProfilesResponse {
  success: boolean
  profiles: APISkyblockProfile[] | null
}

export type OptionalRecord<K extends string | number | symbol, V> = Record<K, V | undefined>

export interface APISkyblockProfile {
  profile_id: string
  community_upgrades: any
  members: OptionalRecord<string, APISkyblockMember>
  banking?: {
    balance: number
  }
  game_mode: string
  cute_name: string
  selected: boolean
}

export interface APISkyblockMember {
  experience_skill_farming?: number
  experience_skill_mining?: number
  experience_skill_combat?: number
  experience_skill_foraging?: number
  experience_skill_fishing?: number
  experience_skill_enchanting?: number
  experience_skill_alchemy?: number
  experience_skill_taming?: number
  experience_skill_carpentry?: number
  experience_skill_runecrafting?: number
  experience_skill_social2?: number
  leveling?: {
    experience: number
  }
  slayer_bosses?: {
    zombie?: APISlayerData
    spider?: APISlayerData
    wolf?: APISlayerData
    enderman?: APISlayerData
    blaze?: APISlayerData
    vampire?: APISlayerData
  }
  dungeons?: {
    dungeon_types?: {
      catacombs?: APIDungeonData & { experience?: number }
      master_catacombs?: APIDungeonData
    }
    player_classes?: {
      healer?: { experience?: number }
      mage?: { experience?: number }
      berserk?: { experience?: number }
      archer?: { experience?: number }
      tank?: { experience?: number }
    }
  }
  bestiary?: {
    migrated_stats?: boolean
    migration?: boolean
    kills?: OptionalRecord<string, number>
    deaths?: OptionalRecord<string, number>
    milestone?: { last_claimed_milestone: 251 }
  }
  trophy_fish?: {
    rewards: number[]
  } & OptionalRecord<string, number>
  jacob2?: {
    medals_inv?: {
      bronze?: number
      silver?: number
      gold?: number
    }
    perks?: {
      double_drops?: number
      farming_level_cap?: number
    }
  }
}

export interface APIDungeonData {
  tier_completions?: OptionalRecord<string, number>
  milestone_completions?: OptionalRecord<string, number>
  highest_tier_completed?: number
  fastest_time?: OptionalRecord<string, number>
  fastest_time_s?: OptionalRecord<string, number>
  fastest_time_s_plus?: OptionalRecord<string, number>
  best_score?: OptionalRecord<string, number>
  mobs_killed?: OptionalRecord<string, number>
  most_mobs_killed?: OptionalRecord<string, number>
  most_damage_tank?: OptionalRecord<string, number>
  most_damage_berserk?: OptionalRecord<string, number>
  most_damage_healer?: OptionalRecord<string, number>
  most_damage_mage?: OptionalRecord<string, number>
  most_damage_archer?: OptionalRecord<string, number>
  most_healing?: OptionalRecord<string, number>

  // these are actually for both
  times_played?: OptionalRecord<string, number>
  watcher_kills?: OptionalRecord<string, number>
}

export interface APISlayerData {
  claimed_levels: OptionalRecord<string, boolean>
  xp?: number
  boss_kills_tier_0?: number
  boss_kills_tier_1?: number
  boss_kills_tier_2?: number
  boss_kills_tier_3?: number
  boss_kills_tier_4?: number
}
