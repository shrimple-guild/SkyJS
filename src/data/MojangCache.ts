import { PostgresPool } from "./database.js"

type UUIDResponse = { uuid: string; updated: string }
type NameResponse = { name: string; updated: string }
type TextureResponse = { texture: Buffer; updated: string }

export class MojangCache {
	private database: PostgresPool

	constructor(connectionPool: PostgresPool) {
		this.database = connectionPool
	}

	async getUuid(name: string): Promise<UUIDResponse | undefined> {
		const result = await this.database.query<UUIDResponse>(
			"SELECT uuid, updated FROM player_names WHERE lower(name) = $1",
			[name.toLowerCase()]
		)
		return result.rows[0]
	}

	async getName(uuid: string): Promise<NameResponse | undefined> {
		const result = await this.database.query<NameResponse>(
			"SELECT name, updated FROM player_names WHERE uuid = $1",
			[uuid]
		)
		return result.rows[0]
	}

	async getSkin(uuid: string): Promise<TextureResponse | undefined> {
		const result = await this.database.query<TextureResponse>(
			`SELECT skin_textures.texture, player_skins.updated 
        FROM player_skins 
        JOIN skin_textures ON player_skins.hash = skin_textures.hash
        WHERE player_skins.uuid = $1`,
			[uuid]
		)
		return result.rows[0]
	}

	async getSkinTexture(skinHash: string): Promise<Buffer | undefined> {
		const result = await this.database.query<TextureResponse>(
			"SELECT texture FROM skin_textures WHERE hash = $1",
			[skinHash]
		)
		return result.rows[0]?.texture
	}

	async setName(uuid: string, name: string) {
		await this.database.transaction(async (client) => {
			await client.query(`DELETE FROM player_names WHERE uuid = $1 OR name = $2`, [uuid, name])
			await client.query(`INSERT INTO player_names (uuid, name) VALUES ($1, $2)`, [uuid, name])
		})
	}

	async setSkinHash(uuid: string, skinHash: string) {
		await this.database.query(
			`INSERT INTO player_skins (uuid, hash) 
        VALUES ($1, $2) 
        ON CONFLICT (uuid) 
        DO UPDATE SET hash = excluded.hash, updated = CURRENT_TIMESTAMP`,
			[uuid, skinHash]
		)
	}

	async setSkinTexture(skinHash: string, texture: Buffer) {
		await this.database.query(
			`INSERT INTO skin_textures (hash, texture) 
        VALUES ($1, $2) 
        ON CONFLICT DO NOTHING`,
			[skinHash, texture]
		)
	}
}
