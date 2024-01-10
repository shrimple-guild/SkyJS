import { Redis } from "ioredis"

export class MojangCache {
	constructor(private client: Redis, private tts: number, private ttl: number) {}

	private async setFreshAndStale(key: string, val: string) {
		await this.client.set(`${key}/fresh`, val, "EX", this.tts)
		await this.client.set(key, val, "EX", this.ttl)
	}

	private async get(key: string) {
		const keys = await this.client.mget(key, `${key}/fresh`)
		return keys[0] ? { value: keys[0], fresh: keys[1] != null } : null
	}

	getUUID(name: string) {
		return this.get(`minecraft_uuid:${name}`)
	}

	getName(uuid: string) {
		return this.get(`minecraft_name:${uuid}`)
	}

	getSkin(uuid: string) {
		return this.get(`minecraft_skin:${uuid}`)
	}

	async setName(uuid: string, name: string) {
		await this.setFreshAndStale(`minecraft_uuid:${name}`, uuid)
		await this.setFreshAndStale(`minecraft_name:${uuid}`, name)
	}

	async setSkin(uuid: string, skin: string) {
		await this.setFreshAndStale(`minecraft_skin:${uuid}`, skin)
	}
}
