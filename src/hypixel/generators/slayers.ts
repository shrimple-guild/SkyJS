import { skills, slayers } from "../../constants/leveling"
import { SkyblockMemberSlayerData, SkyblockMemberSlayers } from "../types/SkyblockProfileTypes"
import { APISkyblockMember, APISkyblockProfile } from "../types/APIProfileTypes"

export function generateSlayers(member: APISkyblockMember): SkyblockMemberSlayers {
  return {
    zombie: generateSlayerData(member, "zombie", 5),
    spider: generateSlayerData(member, "spider", 4),
    wolf: generateSlayerData(member, "wolf", 4),
    enderman: generateSlayerData(member, "enderman", 4),
    blaze: generateSlayerData(member, "blaze", 4),
    vampire: generateSlayerData(member, "vampire", 5),
  }
}

function generateSlayerData(
  member: APISkyblockMember,
  slayer: keyof typeof slayers,
  maxTier: number
): SkyblockMemberSlayerData {
  const apiSlayerData = member.slayer_bosses?.[slayer]
  const kills: number[] = []

  for (let tier = 0; tier < maxTier; tier++) {
    // @ts-ignore
    kills.push(apiSlayerData?.[`boss_kills_tier_${tier}`] ?? 0)
  }

  return {
    level: slayers[slayer].calculateLevel(apiSlayerData?.xp ?? 0),
    kills: kills,
  }
}
