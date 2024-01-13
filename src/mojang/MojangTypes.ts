export type MinecraftPlayer = {
	uuid: string
	username: string
}

export interface APIMinecraftPlayer {
	id: string
	name: string
}

export type APIMojangProfileData = {
	id: string
	name: string
}

export type APIMojangSessionData = {
	id: string
	name: string
	properties: [
		{
			name: "textures"
			value: string
		}
	]
	profileActions: string[]
}

export type APIMojangTextureData = {
	timestamp: number
	profileId: string
	profileName: string
	textures: {
		SKIN?: {
			url: string
			metadata?: {
				model: "slim"
			}
		}
		CAPE?: {
			url: string
		}
	}
}
