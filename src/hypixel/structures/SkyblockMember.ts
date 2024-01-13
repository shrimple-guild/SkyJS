import { generateBestiary } from "../generators/bestiary.js"
import { generateDungeons } from "../generators/dungeons.js"
import { generateSkills } from "../generators/skills.js"
import { generateSlayers } from "../generators/slayers.js"
import { generateTrophyFish } from "../generators/trophyFish.js"
import { SkyblockMemberData } from "../types/SkyblockProfileTypes.js"
import { APISkyblockMember } from "../types/APIProfileTypes.js"
import { MinecraftPlayer } from "../../mojang/MojangTypes.js"

export class SkyblockMember {
	constructor(readonly raw: APISkyblockMember) {}

	get skyblockLevel() {
		return (this.raw.leveling?.experience ?? 0) / 100
	}
}
