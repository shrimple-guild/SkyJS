import { LevelData } from "../hypixel/types/SkyblockProfileTypes.js"

export class Level {
	private readonly cumulative: number[]

	constructor(private leveling: ReadonlyArray<number>, private max: number) {
		this.cumulative = []
		leveling.reduce((prev, cur, i) => {
			this.cumulative[i] = prev + cur
			return prev + cur
		}, 0)
	}

	calculateLevel(xp: number, cap?: number): LevelData {
		let level = 0
		let maxLevel = Math.min(cap ?? Infinity, this.max)
		let levelingCurve = this.cumulative.slice(0, maxLevel)
		for (let i = 0; i < levelingCurve.length; i++) {
			if (xp >= levelingCurve[i]!) {
				level++
			} else {
				break
			}
		}
		let xpOverLevel = xp - (levelingCurve[level - 1] ?? 0)
		return {
			level,
			xp,
			xpOverLevel,
			xpToNext: level != maxLevel ? levelingCurve[level]! - xpOverLevel : undefined,
			maxed: level == this.max,
			cap
		}
	}
}
