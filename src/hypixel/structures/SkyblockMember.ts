import { PlayerInfo } from "../../mojang/mojang.js"
import { generateBestiary } from "../generators/bestiary.js"
import { generateDungeons } from "../generators/dungeons.js"
import { generateSkills } from "../generators/skills.js"
import { generateSlayers } from "../generators/slayers.js"
import { generateTrophyFish } from "../generators/trophyFish.js"
import { SkyblockMemberData } from "../types/SkyblockProfileTypes.js"
import { APISkyblockMember } from "../types/APIProfileTypes.js"

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
			trophyFish: generateTrophyFish(this.member)
		}
	}
}
