import type UseCaseInterface from '../../@shared/usecase/use-case.interface';
import { type AddClientFacadeInputDto, type FindClientFacadeInputDto, type FindClientFacadeOutputDto } from './client-adm.facade.interface';
import type ClientAdmFacadeInterface from './client-adm.facade.interface';

export interface UseCaseProps {
  findUsecase: UseCaseInterface
  addUsecase: UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private readonly _findUseCase: UseCaseInterface;
  private readonly _addUseCase: UseCaseInterface;

  constructor (props: UseCaseProps) {
    this._findUseCase = props.findUsecase;
    this._addUseCase = props.addUsecase;
  }

  async add (input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input);
  }

  async find (input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase.execute(input);
  }
}
