import { MojangAPIError } from "../hypixel/errors/MojangAPIError"
import memoize from "memoizee"
import sharp from "sharp"

export type PlayerInfo = {
  uuid: string
  username: string
  avatar: string
}

export function resolve(input: string): Promise<PlayerInfo> {
  let uuidProvided = isUUID(input)
  return uuidProvided ? getUsername(input) : getUuid(input)
}

function isUUID(input: string): boolean {
  const pattern = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?4[0-9a-fA-F]{3}-?[89abAB][0-9a-fA-F]{3}-?[0-9a-fA-F]{12}$/
  return pattern.test(input)
}

const getUuid = memoize(fetchUuidFromAPI, { promise: true, maxAge: 5 * 60 * 1000 })
const getUsername = memoize(fetchUsernameFromAPI, { promise: true, maxAge: 5 * 60 * 1000 })
const getSkin = memoize(fetchSkinFromAPI, { promise: true, maxAge: 5 * 60 * 1000 })

async function fetchUuidFromAPI(username: string): Promise<PlayerInfo> {
  const url = new URL(`https://api.mojang.com/users/profiles/minecraft/${username}`)
  const mojangResponse = await fetch(url)
  if (mojangResponse.status == 200) {
    const json: any = await mojangResponse.json()
    return { username: json.name, uuid: json.id, avatar: await getSkin(json.id) }
  }
  if (mojangResponse.ok) throw new MojangAPIError(`Invalid username.`, mojangResponse.status)
  throw new MojangAPIError(`Mojang API error ${mojangResponse.statusText}`, mojangResponse.status)
}

async function fetchUsernameFromAPI(uuid: string): Promise<PlayerInfo> {
  const url = new URL(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
  const mojangResponse = await fetch(url)
  if (mojangResponse.status == 200) {
    const json: any = await mojangResponse.json()
    return { username: json.name, uuid: json.id, avatar: await getSkin(json.id) }
  }
  if (mojangResponse.ok) throw new MojangAPIError(`Invalid username.`, mojangResponse.status)
  throw new MojangAPIError(`Mojang API error ${mojangResponse.statusText}`, mojangResponse.status)
}

async function fetchSkinFromAPI(uuid: string): Promise<string> {
  const profileResponse = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
  if (profileResponse.status !== 200) {
    throw new Error(`Mojang API returned code ${profileResponse.status} while getting profile data for ${uuid}.`)
  }
  const content = (await profileResponse.json()) as any
  const textureUrl = JSON.parse(Buffer.from(content.properties[0].value, "base64").toString("ascii")).textures.SKIN.url
  const textureResponse = await fetch(textureUrl)
  const buffer = new Uint8ClampedArray(await textureResponse.arrayBuffer())
  const helmet = await sharp(buffer).extract({ left: 40, top: 8, width: 8, height: 8 }).toBuffer()
  const data = await sharp(buffer)
    .extract({ left: 8, top: 8, width: 8, height: 8 })
    .composite([{ input: helmet }])
    .removeAlpha()
    .raw()
    .toBuffer()
  return data.toString("base64")
}
