import { expect, test } from "bun:test"
import { Level } from "../src/utils/Level"

const testLevel = new Level([50, 100, 150, 200, 250], 5)
test("skill info 0 xp", () => {
  expect(testLevel.calculateLevel(0)).toStrictEqual({
    level: 0,
    levelXp: 50,
    max: false,
    overflow: 0,
    xp: 0,
  })
})

test("skill info 50 xp", () => {
  expect(testLevel.calculateLevel(50)).toStrictEqual({
    level: 1,
    levelXp: 100,
    max: false,
    overflow: 0,
    xp: 50,
  })
})

test("skill info 150 xp", () => {
  expect(testLevel.calculateLevel(150)).toStrictEqual({
    level: 2,
    levelXp: 150,
    max: false,
    overflow: 0,
    xp: 150,
  })
})

test("skill info 200 xp", () => {
  expect(testLevel.calculateLevel(200)).toStrictEqual({
    level: 2,
    levelXp: 150,
    max: false,
    overflow: 50,
    xp: 200,
  })
})

test("skill info over max xp", () => {
  expect(testLevel.calculateLevel(1000)).toStrictEqual({
    level: 5,
    levelXp: 250,
    max: true,
    overflow: 250,
    xp: 1000,
  })
})
