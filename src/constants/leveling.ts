import { Level } from "../utils/Level"

const levelData = {
  names: {
    farming: "experience_skill_farming",
    mining: "experience_skill_mining",
    combat: "experience_skill_combat",
    foraging: "experience_skill_foraging",
    fishing: "experience_skill_fishing",
    enchanting: "experience_skill_enchanting",
    alchemy: "experience_skill_alchemy",
    taming: "experience_skill_taming",
    carpentry: "experience_skill_carpentry",
    runecrafting: "experience_skill_runecrafting",
  },
  skillXp: [
    50, 125, 200, 300, 500, 750, 1000, 1500, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000,
    200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000,
    1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2750000,
    2900000, 3100000, 3400000, 3700000, 4000000, 4300000, 4600000, 4900000, 5200000, 5500000, 5800000, 6100000, 6400000,
    6700000, 7000000,
  ],
  runecraftingXp: [
    50, 100, 125, 160, 200, 250, 315, 400, 500, 625, 785, 1000, 1250, 1600, 2000, 2465, 3125, 4000, 5000, 6200, 7800,
    9800, 12200, 15300, 19050,
  ],
  socialXp: [
    50, 100, 150, 250, 500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 3750, 4500, 6000, 8000, 10000, 12500, 15000, 20000,
    25000, 30000, 35000, 40000, 50000,
  ],
  zombie: [5, 15, 200, 1000, 5000, 20000, 100000, 400000, 1000000],
  spider: [5, 25, 200, 1000, 5000, 20000, 100000, 400000, 1000000],
  wolf: [10, 30, 250, 1500, 5000, 20000, 100000, 400000, 1000000],
  enderman: [10, 30, 250, 1500, 5000, 20000, 100000, 400000, 1000000],
  blaze: [10, 30, 250, 1500, 5000, 20000, 100000, 400000, 1000000],
  vampire: [20, 75, 240, 840, 2400],
  dungeons: [
    50, 75, 110, 160, 230, 330, 470, 670, 950, 1340, 1890, 2665, 3760, 5260, 7380, 10300, 14400, 20000, 27600, 38000,
    52500, 71500, 97000, 132000, 180000, 243000, 328000, 445000, 600000, 800000, 1065000, 1410000, 1900000, 2500000,
    3300000, 4300000, 5600000, 7200000, 9200000, 12000000, 15000000, 19000000, 24000000, 30000000, 38000000, 48000000,
    60000000, 75000000, 93000000, 116250000,
  ],
} as const

export const dungeons = new Level(levelData.dungeons, 50)

export const slayers = {
  zombie: new Level(levelData.zombie, 9),
  spider: new Level(levelData.zombie, 9),
  wolf: new Level(levelData.zombie, 9),
  enderman: new Level(levelData.zombie, 9),
  blaze: new Level(levelData.zombie, 9),
  vampire: new Level(levelData.zombie, 5),
}

export const skills = {
  farming: new Level(levelData.skillXp, 60),
  mining: new Level(levelData.skillXp, 60),
  combat: new Level(levelData.skillXp, 60),
  foraging: new Level(levelData.skillXp, 50),
  fishing: new Level(levelData.skillXp, 50),
  enchanting: new Level(levelData.skillXp, 60),
  alchemy: new Level(levelData.skillXp, 50),
  taming: new Level(levelData.skillXp, 50),
  carpentry: new Level(levelData.skillXp, 50),
  runecrafting: new Level(levelData.runecraftingXp, 25),
  social: new Level(levelData.socialXp, 25),
}

export interface SkillData {
  cap: number
  leveling: number[]
}
