import type UseCaseInterface from '../../@shared/usecase/use-case.interface';
import { type GenerateInvoiceFacadeOutputDto, type FindInvoiceFacadeInputDto, type FindInvoiceFacadeOutputDto, type GenerateInvoiceFacadeInputDto, type InvoiceFacadeInterface } from './invoice.facade.interface';

export interface UseCaseProps {
  generateInvoiceUseCase: UseCaseInterface
  findInvoiceUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private readonly _generateInvoiceUseCase: UseCaseInterface;
  private readonly _findInvoiceUseCase: UseCaseInterface;

  constructor (useCaseProps: UseCaseProps) {
    this._generateInvoiceUseCase = useCaseProps.generateInvoiceUseCase;
    this._findInvoiceUseCase = useCaseProps.findInvoiceUseCase;
  }

  async generate (input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateInvoiceUseCase.execute(input);
  };

  async find (input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findInvoiceUseCase.execute(input);
  }
}
