import { NextFunction, Request, Response } from "express"
import { MojangService } from "../../../mojang/MojangService.js"
import { HypixelService } from "../../../hypixel/HypixelService.js"

export const RawProfilesRoute = {
	route: "/hypixel/skyblock/profiles/:id/raw",
	handler: async (req: Request, res: Response, next: NextFunction) => {
		const player = await MojangService.get(req.params.id!)
		if (player == null) {
			res.status(404).send({ cause: "No user found." })
			return
		}
		const profiles = await HypixelService.getSkyblockProfiles(player.uuid)
		if (profiles == null) {
			res.status(404).send({ cause: `No profiles found for user ${player.username}.` })
			return
		}
		res.send({ player, profiles })
	}
}
