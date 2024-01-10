import express from "express"
import { fetchHypixelProfiles } from "./hypixel/api.js"
import { HypixelAPIError } from "./hypixel/errors/HypixelAPIError.js"
import { resolve } from "./mojang/mojang.js"
import { isTrue } from "./utils/utils.js"

const app = express()
const port = 3000

app.get("/skyblock/profiles/:name", async (req, res, next) => {
	try {
		const { name } = req.params

		const profiles = await fetchHypixelProfiles(name)

		return res.json(profiles.main.generate())
	} catch (error) {
		if (error instanceof HypixelAPIError) {
			return res.status(error.statusCode).json({ cause: error.message })
		} else {
			console.error(error)
			return res.status(500).json({ error: "An unexpected error occurred" })
		}
	}
})

app.get("/minecraft/:name", async (req, res, next) => {
	const includeAvatar = isTrue(req.query.avatar)
	const { name } = req.params
	res.json(await resolve(name, includeAvatar))
})

app.listen(port, () => {
	console.log(`Express server is running on port ${port}`)
})
