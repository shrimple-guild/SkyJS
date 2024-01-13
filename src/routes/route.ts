import { NextFunction, Request, Response } from "express"

export type Route = {
	route: string
	handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
