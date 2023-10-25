export interface FindAllProductsDto {
  products: Array<{
    id: string
    name: string
    description: string
    salesPrice: number
  }>
}
