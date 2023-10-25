import type UseCaseInterface from '../../@shared/usecase/use-case.interface';
import { type ProductAdmFacadeInterface, type AddProductFacedeInputDto, type CheckStockFacadeInputDto, type CheckStockFacadeOutputDto } from './product-adm.facade.interface';

export interface UseCaseProps {
  addUseCase: UseCaseInterface
  stockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private readonly _addUseCase: UseCaseInterface;
  private readonly _checkStockUseCase: UseCaseInterface;

  constructor (usecasesProps: UseCaseProps) {
    this._addUseCase = usecasesProps.addUseCase;
    this._checkStockUseCase = usecasesProps.stockUseCase;
  }

  async addProduct (input: AddProductFacedeInputDto): Promise<void> {
    return await this._addUseCase.execute(input);
  }

  async checkStock (input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return await this._checkStockUseCase.execute(input);
  }
}
