import { NextFunction, Request, Response } from "express"
import { MojangService } from "../../../mojang/MojangService.js"
import { HypixelService } from "../../../hypixel/HypixelService.js"

export const RawProfileRoute = {
	route: "/hypixel/skyblock/profile/:id/:strategy",
	handler: async (req: Request, res: Response, next: NextFunction) => {
		const player = await MojangService.get(req.params.id!)
		if (player == null) {
			res.status(404).send({ cause: "No user found." })
			return
		}
		const profile = await HypixelService.getSkyblockProfile(player.uuid, req.params.strategy!)
		if (profile == null) {
			res.status(404).send({ cause: `No profile found with query ${req.params.strategy}.` })
			return
		}
		res.send({ player, profile: profile.json() })
	}
}
