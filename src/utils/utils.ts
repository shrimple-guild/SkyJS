export function normalizeUuid(uuid: string) {
	return uuid.replaceAll("-", "")
}

export function removeFormatting(str: string) {
	return str.replaceAll(/§[0-9a-fklmnor]/g, "")
}

export function isTrue(param: any) {
	return param?.toString()?.toLocaleLowerCase() == "true"
}
