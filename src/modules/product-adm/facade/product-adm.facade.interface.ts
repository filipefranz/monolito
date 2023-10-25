export interface AddProductFacedeInputDto {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface CheckStockFacadeInputDto {
  productId: string
}

export interface CheckStockFacadeOutputDto {
  productId: string
  stock: number
}

export interface ProductAdmFacadeInterface {
  addProduct: (input: AddProductFacedeInputDto) => Promise<void>
  checkStock: (input: CheckStockFacadeInputDto) => Promise<CheckStockFacadeOutputDto>
};
