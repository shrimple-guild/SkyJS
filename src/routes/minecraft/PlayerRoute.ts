import { NextFunction, Request, Response } from "express"
import { MojangService } from "../../mojang/MojangService.js"

export const PlayerRoute = {
	route: "/minecraft/players/:id",
	handler: async (req: Request, res: Response, next: NextFunction) => {
		const user = await MojangService.get(req.params.id!)
		if (user != null) {
			res.send(user)
		} else {
			res.status(404).send({ cause: "No user found." })
		}
	}
}
