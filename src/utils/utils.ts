import { IllegalArgumentException } from "../hypixel/errors/IllegalArgumentException.js"

const uuidRegex = /^([a-f0-9]{8})-?([a-f0-9]{4})-?([a-f0-9]{4})-?([a-f0-9]{4})-?([a-f0-9]{12})$/i

export function standardizeUuid(uuid: string): string | undefined {
	const matcher = uuid.match(uuidRegex)
	if (matcher == null) throw new IllegalArgumentException(`${uuid} is not a UUID.`)
	return matcher.slice(1).join("-").toLocaleLowerCase()
}

export function trimUuid(uuid: string): string {
	return uuid.replaceAll("-", "").toLocaleLowerCase()
}

export function isUuid(uuid: string): boolean {
	return uuidRegex.test(uuid)
}

const minecraftNameRegex = /^\w{1,16}$/

export function isName(maybeName: string): boolean {
	return minecraftNameRegex.test(maybeName)
}

export function removeFormatting(str: string) {
	return str.replaceAll(/§[0-9a-fklmnor]/g, "")
}

export function isTrue(param: any) {
	return param?.toString()?.toLocaleLowerCase() == "true"
}

export function dateDiff(start: Date, end: Date) {
	return end.valueOf() - start.valueOf()
}
