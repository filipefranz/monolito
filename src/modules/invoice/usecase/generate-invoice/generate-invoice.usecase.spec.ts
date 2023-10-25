import { Sequelize } from 'sequelize-typescript';
import InvoiceItemModel from '../../repository/invoice-item.model';
import InvoiceModel from '../../repository/invoice.model';
import GenerateInvoiceUseCase from './generate-invoice.usecase';

const MockRepository = (): any => {
  return {
    generate: jest.fn(),
    find: jest.fn()
  };
};

describe('Generate Invoice Use Case', () => {
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

  it('should generate a invoce by use case', async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

    const input = {
      name: 'any_name',
      document: 'any_document',
      street: 'any_street',
      number: 'any_number',
      complement: 'any_complement',
      city: 'any_city',
      state: 'any_state',
      zipCode: 'any_zip_code',
      items: [
        {
          id: 'any_id',
          name: 'any_name',
          price: 100
        },
        {
          id: 'any_id2',
          name: 'any_name2',
          price: 200
        }
      ]
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalledTimes(1);
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.total).toBe(300);
  });
});
