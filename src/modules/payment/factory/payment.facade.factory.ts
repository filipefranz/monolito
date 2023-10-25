import type PaymentFacadeInterface from '../facade/facade.interface';
import PaymentFacade from '../facade/payment.facade';
import TransactionRepository from '../repository/transaction.repository';
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase';

export default class PaymentFacadeFactory {
  create (): PaymentFacadeInterface {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade(usecase);
    return facade;
  }
}
