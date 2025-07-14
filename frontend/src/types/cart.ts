export interface CartItem {
  id: string
  name: string
  vendor: string
  price: number
  unit: string
  quantity: number
  image: string
  groupBuying?: boolean
}