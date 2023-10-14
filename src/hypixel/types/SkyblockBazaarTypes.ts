export type SkyblockBazaarProduct = {
  productId: string
  productName: string
  sell: {
    price: number
    volume: number
    movingWeek: number
    orderCount: number
    orders: SkyblockBazaarOrders[]
  }
  buy: {
    price: number
    volume: number
    movingWeek: number
    orderCount: number
    orders: SkyblockBazaarOrders[]
  }
}

export interface SkyblockBazaarOrders {
  amount: number
  pricePerUnit: number
  orders: number
}
