import { PlayerInfo } from "../../mojang/mojang"
import { generateBestiary } from "../generators/bestiary"
import { generateDungeons } from "../generators/dungeons"
import { generateSkills } from "../generators/skills"
import { generateSlayers } from "../generators/slayers"
import { generateTrophyFish } from "../generators/trophyFish"
import { SkyblockMemberData } from "../types/SkyblockProfileTypes"
import { APISkyblockMember } from "../types/APIProfileTypes"

export class SkyblockMember {
  constructor(private player: PlayerInfo, private member: APISkyblockMember) {}

  get skyblockLevel() {
    return (this.member.leveling?.experience ?? 0) / 100
  }

  generate(): SkyblockMemberData {
    return {
      skills: generateSkills(this.member),
      slayers: generateSlayers(this.member),
      dungeons: generateDungeons(this.member),
      bestiary: generateBestiary(this.member),
      trophyFish: generateTrophyFish(this.member),
    }
  }
}
