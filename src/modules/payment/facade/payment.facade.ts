import type ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase';
import { type PaymentFacadeInputDto, type PaymentFacadeOutputDto } from './facade.interface';
import type PaymentFacadeInterface from './facade.interface';

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor (private readonly processPaymentUseCase: ProcessPaymentUseCase) {}

  async process (input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input);
  }
}
