import { dungeons } from "../../constants/leveling.js"
import { SkyblockMember } from "../structures/SkyblockMember.js"
import {
	SkyblockDungeonBossData,
	SkyblockDungeonFloorData
} from "../types/SkyblockProfileTypes.js"
import { APIDungeonData, APISkyblockMember } from "../types/APIProfileTypes.js"

export function generateDungeons(member: APISkyblockMember) {
	const catacombs = member.dungeons?.dungeon_types?.catacombs
	const masterCatacombs = member.dungeons?.dungeon_types?.master_catacombs
	return {
		level: dungeons.calculateLevel(
			member.dungeons?.dungeon_types?.catacombs?.experience ?? 0
		),
		classes: {
			healer: dungeons.calculateLevel(
				member.dungeons?.player_classes?.healer?.experience ?? 0
			),
			mage: dungeons.calculateLevel(
				member.dungeons?.player_classes?.mage?.experience ?? 0
			),
			archer: dungeons.calculateLevel(
				member.dungeons?.player_classes?.archer?.experience ?? 0
			),
			tank: dungeons.calculateLevel(
				member.dungeons?.player_classes?.tank?.experience ?? 0
			),
			berserk: dungeons.calculateLevel(
				member.dungeons?.player_classes?.berserk?.experience ?? 0
			)
		},
		floors: {
			entrance: generateFloorData(catacombs, 0),
			floor1: generateFloorData(catacombs, 1),
			floor2: generateFloorData(catacombs, 2),
			floor3: generateFloorData(catacombs, 3),
			floor4: generateFloorData(catacombs, 4),
			floor5: generateFloorData(catacombs, 5),
			floor6: generateFloorData(catacombs, 6),
			floor7: generateFloorData(catacombs, 7),
			masterMode1: generateFloorData(masterCatacombs, 1),
			masterMode2: generateFloorData(masterCatacombs, 2),
			masterMode3: generateFloorData(masterCatacombs, 3),
			masterMode4: generateFloorData(masterCatacombs, 4),
			masterMode5: generateFloorData(masterCatacombs, 5),
			masterMode6: generateFloorData(masterCatacombs, 6),
			masterMode7: generateFloorData(masterCatacombs, 7)
		},
		collection: {
			bonzo: generateBossData(member, 1),
			scarf: generateBossData(member, 2),
			professor: generateBossData(member, 3),
			thorn: generateBossData(member, 4),
			livid: generateBossData(member, 5),
			sadan: generateBossData(member, 6),
			necron: generateBossData(member, 7)
		}
	}
}

function generateBossData(member: APISkyblockMember, floor: number): number {
	return (
		(member.dungeons?.dungeon_types?.catacombs?.tier_completions?.[floor] ??
			0) +
		(member.dungeons?.dungeon_types?.master_catacombs?.tier_completions?.[
			floor
		] ?? 0)
	)
}

function generateFloorData(
	dungeon: APIDungeonData | undefined,
	floor: number
): SkyblockDungeonFloorData {
	return {
		tierCompletions: dungeon?.tier_completions?.[floor] ?? 0,
		milestoneCompletions: dungeon?.milestone_completions?.[floor] ?? 0,
		fastestTime: dungeon?.fastest_time?.[floor] ?? 0,
		fastestTimeS: dungeon?.fastest_time_s?.[floor] ?? 0,
		fastestTimeSPlus: dungeon?.fastest_time_s_plus?.[floor] ?? 0,
		bestScore: dungeon?.best_score?.[floor] ?? 0,
		mobsKilled: dungeon?.mobs_killed?.[floor] ?? 0,
		mostMobsKilled: dungeon?.most_healing?.[floor] ?? 0,
		mostDamageArcher: dungeon?.most_damage_archer?.[floor] ?? 0,
		mostDamageBerserk: dungeon?.most_damage_berserk?.[floor] ?? 0,
		mostDamageHealer: dungeon?.most_damage_healer?.[floor] ?? 0,
		mostDamageMage: dungeon?.most_damage_mage?.[floor] ?? 0,
		mostDamageTank: dungeon?.most_damage_tank?.[floor] ?? 0,
		mostHealing: dungeon?.most_healing?.[floor] ?? 0
	}
}
