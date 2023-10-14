export class HypixelAPIError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = "HypixelAPIError"
    this.statusCode = statusCode
  }
}
