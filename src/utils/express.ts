import express, { NextFunction, Request, Response } from "express"
import { Route } from "../routes/route.js"

export function addAsyncGetRoute(app: express.Express, route: Route) {
	app.get(route.route, (req, res, next) => route.handler(req, res, next).catch(next))
}
