import pg, { PoolClient } from "pg"
const { Pool } = pg

export class PostgresPool {
	private pool: pg.Pool

	constructor(pool: pg.Pool) {
		this.pool = pool
	}

	query<T extends pg.QueryResultRow>(query: string, params?: any[]) {
		return this.pool.query<T>(query, params)
	}

	async transaction<T>(cb: (client: PoolClient) => Promise<T>) {
		const client = await this.pool.connect()
		try {
			await client.query("BEGIN")
			const result = await cb(client)
			await client.query("COMMIT")
			return result
		} catch (e) {
			await client.query("ROLLBACK")
			throw e
		} finally {
			client.release()
		}
	}
}

const pool = new Pool()

export const postgresPool = new PostgresPool(pool)
