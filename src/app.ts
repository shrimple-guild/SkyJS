import express, { NextFunction, Request, RequestHandler, Response } from "express"
import { PlayerRoute } from "./routes/minecraft/PlayerRoute.js"
import { addAsyncGetRoute } from "./utils/express.js"
import axios from "axios"
import { HttpError } from "./hypixel/errors/HttpError.js"
import { RawProfilesRoute } from "./routes/hypixel/skyblock/RawProfilesRoute.js"
import { RawProfileRoute } from "./routes/hypixel/skyblock/RawProfileRoute.js"

const app = express()
const port = 3000

addAsyncGetRoute(app, PlayerRoute)
addAsyncGetRoute(app, RawProfilesRoute)
addAsyncGetRoute(app, RawProfileRoute)

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof HttpError) {
		res.status(error.statusCode).json({
			source: "upstream",
			url: error.url,
			status: error.statusCode
		})
	} else if (axios.isAxiosError(error)) {
		res.status(500).json({
			source: "axios",
			error: error.message
		})
	}
})

app.listen(port, () => {
	console.log(`Started server on port ${port}`)
})
