export interface GenerateInvoiceFacadeInputDto {
  id?: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
  }>
}

export interface GenerateInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
  }>
  total: number
}

export interface FindInvoiceFacadeInputDto {
  id: string | undefined
}

export interface FindInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
  items: Array<{
    id: string
    name: string
    price: number
  }>
  total: number
  createdAt: Date
}

export interface InvoiceFacadeInterface {
  generate: (input: GenerateInvoiceFacadeInputDto) => Promise<GenerateInvoiceFacadeInputDto>
  find: (input: FindInvoiceFacadeInputDto) => Promise<FindInvoiceFacadeOutputDto>
}
