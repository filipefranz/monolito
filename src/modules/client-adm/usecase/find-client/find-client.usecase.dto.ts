import type Address from '../../../@shared/domain/value-object/address';

export interface FindClientInputDto {
  id: string
}

export interface FindClientOutputDto {
  id: string
  name: string
  email: string
  document: string
  address: Address
  createdAt: Date
  updatedAt: Date
}
