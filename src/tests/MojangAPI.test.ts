import {
	fetchMojangProfile,
	fetchMojangSession,
	fetchSkin,
	fetchTextureData
} from "../mojang/MojangAPI.js"

async function test() {
	const mojangProfile = await fetchMojangProfile("appable")
	if (mojangProfile == null) return
	console.log(mojangProfile)
	const mojangSession = await fetchMojangSession(mojangProfile.id)
	console.log(mojangSession)
	if (mojangSession == null) return
	const texture = await fetchTextureData(mojangSession)
	const skin = await fetchSkin(texture)
	console.log(skin)
}

await test()
