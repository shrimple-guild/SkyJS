import { OptionalRecord } from "./APIProfileTypes.js"

export interface APISkyblockBazaarResponse {
	success: boolean
	lastUpdated: number
	products: Record<string, APISkyblockBazaarProduct>
}

export interface APISkyblockBazaarProduct {
	product_id: string
	sell_summary: APISkyblockBazaarOrders[]
	buy_summary: APISkyblockBazaarOrders[]
	quick_status: {
		productId: string
		sellPrice: number
		sellVolume: number
		sellMovingWeek: number
		sellOrders: number
		buyPrice: number
		buyVolume: number
		buyMovingWeek: number
		buyOrders: number
	}
}

export interface APISkyblockBazaarOrders {
	amount: number
	pricePerUnit: number
	orders: number
}
