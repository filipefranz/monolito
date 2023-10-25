import { Sequelize } from 'sequelize-typescript';
import FindInvoiceUseCase from './find-invoice.usecase';
import InvoiceModel from '../../repository/invoice.model';
import InvoiceItemModel from '../../repository/invoice-item.model';
import Id from '../../../@shared/domain/value-object/id.value-object';
import Invoice from '../../domain/invoice';
import Address from '../../domain/value-object/address';
import InvoiceItem from '../../domain/invoice-item';

const mockInvoice = new Invoice({
  id: new Id('any_id'),
  name: 'any_name',
  document: 'any_document',
  address: new Address({
    street: 'any_street',
    number: 'any_number',
    complement: 'any_complement',
    city: 'any_city',
    state: 'any_state',
    zipCode: 'any_zipCode'
  }),
  items: [
    new InvoiceItem({
      id: new Id('any_id'),
      name: 'any_name',
      price: 100
    }),
    new InvoiceItem({
      id: new Id('any_id2'),
      name: 'any_name2',
      price: 200
    })
  ],
  createdAt: new Date(),
  updatedAt: new Date()
});

const MockRepository = (): any => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockResolvedValue(mockInvoice)
  };
};

describe('Find Invoice Use Case Test', () => {
  let sequilize: Sequelize;

  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequilize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequilize.sync();
  });

  afterEach(async () => {
    await sequilize.close();
  });

  it('should find a invoice by use case', async () => {
    const invoiceRepository = MockRepository();
    const useCase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: 'any_id'
    };

    const result = await useCase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalledTimes(1);
    expect(result.id).toBeDefined();
    expect(result.name).toBe('any_name');
    expect(result.document).toBe('any_document');
    expect(result.address.street).toBe('any_street');
    expect(result.address.number).toBe('any_number');
    expect(result.address.complement).toBe('any_complement');
    expect(result.address.city).toBe('any_city');
    expect(result.address.state).toBe('any_state');
    expect(result.address.zipCode).toBe('any_zipCode');
    expect(result.items[0].id).toBe('any_id');
    expect(result.items[0].name).toBe('any_name');
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].id).toBe('any_id2');
    expect(result.items[1].name).toBe('any_name2');
    expect(result.items[1].price).toBe(200);
    expect(result.total).toBe(300);
  });
});
