import { parse, simplify } from "prismarine-nbt"

export async function fetchAuctions(): Promise<Auction[]> {
	const auctions: APIAuction[] = []
	const pages = []
	const firstPage = fetchPage(0)
	pages.push(firstPage)
	const totalPages = (await firstPage).totalPages
	for (let page = 1; page < totalPages; page++) {
		pages.push(fetchPage(page))
	}
	const allPages = await Promise.allSettled(pages)
	for (let page of allPages) {
		if (page.status == "rejected") continue
		auctions.push(...page.value.auctions)
	}
	return Promise.all(auctions.map((auction) => parseAuction(auction)))
}

async function fetchPage(page: number): Promise<APIAuctionResponse> {
	const url = new URL("https://api.hypixel.net/skyblock/auctions")
	url.searchParams.set("page", page.toString())
	const response = await fetch("https://api.hypixel.net/skyblock/auctions")
	return response.json()
}

export async function parseAuction(auction: APIAuction) {
	const bytes = Buffer.from(auction.item_bytes, "base64")
	const parsed = await parse(bytes)
	//@ts-ignore
	const stack = simplify(parsed.parsed).i[0]
	return {
		auctioneer: auction.auctioneer,
		auctionId: auction.uuid,
		profileId: auction.profile_id,
		start: auction.start,
		end: auction.end,
		starting_bid: auction.starting_bid,
		bin: auction.bin,
		item: {
			raw: stack,
			count: stack.Count,
			displayName: stack.tag.display.Name,
			skyblockId: stack.tag.ExtraAttributes.id,
			uuid: stack.tag.ExtraAttributes.uuid,
			timestamp: stack.tag.ExtraAttributes.timestamp
		}
	}
}

interface APIAuctionResponse {
	success: boolean
	page: number
	totalPages: number
	totalAuctions: number
	lastUpdated: number
	auctions: APIAuction[]
}

interface APIAuction {
	uuid: string
	auctioneer: string
	profile_id: string
	coop: string[]
	start: number
	end: number
	item_name: string
	item_lore: string
	extra: string
	category: string
	tier: string
	starting_bid: number
	item_bytes: string
	claimed: boolean
	claimed_bidders: string[]
	highest_bid_amount: number
	last_updated: number
	bin: boolean
	bids: APIBid[]
	item_uuid: string
}

type Auction = {
	auctioneer: string
	auctionId: string
	profileId: string
	start: number
	end: number
	starting_bid: number
	bin: boolean
	item: {
		raw: any
		count: number
		displayName: string
		skyblockId: string
		uuid: string
		timestamp: number
	}
}

interface APIBid {
	auction_id: string
	bidder: string
	profile_id: string
	amount: number
	timestamp: number
}
