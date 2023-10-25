import Id from '../../../@shared/domain/value-object/id.value-object';
import Transaction from '../../domain/transaction';
import ProcessPaymentUseCase from './process-payment.usecase';

const transaction = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: '1',
  status: 'approved'
});

const MockRepository = (): any => {
  return {
    save: jest.fn().mockResolvedValue(transaction)
  };
};

const transaction2 = new Transaction({
  id: new Id('1'),
  amount: 50,
  orderId: '1',
  status: 'declined'
});

const MockRepositoryDeclined = (): any => {
  return {
    save: jest.fn().mockResolvedValue(transaction2)
  };
};

describe('ProcessPaymentUseCase Unit Tests', () => {
  it('should process a transaction', async () => {
    const paymentRepository = MockRepository();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: '1',
      amount: 100
    };

    const result = await useCase.execute(input);

    expect(result.transactionId).toBe(transaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe('approved');
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe('1');
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('should decline a transaction', async () => {
    const paymentRepository = MockRepositoryDeclined();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: '1',
      amount: 50
    };

    const result = await useCase.execute(input);

    expect(result.transactionId).toBe(transaction2.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe('declined');
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe('1');
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
