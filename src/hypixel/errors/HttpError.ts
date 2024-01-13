export class HttpError extends Error {
	statusCode: number
	url: string

	constructor(message: string, statusCode: number, url: string) {
		super(message)
		this.name = "HttpError"
		this.url = url
		this.statusCode = statusCode
	}
}
