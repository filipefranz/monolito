import type FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase';
import type FindProductUseCase from '../usecase/find-product/find-product.usecase';
import { type FindStoreCatalogFacadeOutputDto, type FindAllStoreCatalogFacadeOutputDto, type FindStoreCatalogFacadeInputDto } from './store-catalog.facade.interface';
import type StoreCatalogFacadeInterface from './store-catalog.facade.interface';

export interface UseCaseProps {
  findUseCase: FindProductUseCase
  findAllUseCase: FindAllProductsUsecase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private readonly _findUseCase: FindProductUseCase;
  private readonly _findAllUseCase: FindAllProductsUsecase;

  constructor (props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async find (id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute(id);
  }

  async findAll (): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute();
  }
}
