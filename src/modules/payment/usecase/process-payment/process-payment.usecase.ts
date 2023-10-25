import type UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import Transaction from '../../domain/transaction';
import type PaymentGateway from '../../gateway/payment.gateway';
import { type ProcessPaymentInputDto, type ProcessPaymentOutputDto } from './process-payment.dto';

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor (
    private readonly transactionRepository: PaymentGateway
  ) {}

  async execute (input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      orderId: input.orderId,
      amount: input.amount
    });

    transaction.process();

    const persistTransaction = await this.transactionRepository.save(transaction);

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt
    };
  }
}
