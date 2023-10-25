import { Sequelize } from 'sequelize-typescript';
import InvoiceFacadeFactory from '../factory/facade.factory';
import InvoiceItemModel from '../repository/invoice-item.model';
import InvoiceModel from '../repository/invoice.model';

describe('InvoiceFacade', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should generate a invoice by facade', async () => {
    const input = {
      id: '1',
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street 1',
      number: '1',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: 'ZipCode 1',
      items: [
        {
          id: '1',
          name: 'Item 1',
          price: 100
        },
        {
          id: '2',
          name: 'Item 2',
          price: 200
        }
      ]
    };

    const invoiceFacade = new InvoiceFacadeFactory().create();
    const savedInvoice = await invoiceFacade.generate(input);

    const invoice = await InvoiceModel.findOne({
      where: { id: savedInvoice.id },
      include: ['items']
    });

    expect(invoice).toBeDefined();
    expect(savedInvoice.id).toEqual(invoice?.id);
    expect(input.name).toEqual(invoice?.name);
    expect(input.document).toEqual(invoice?.document);
    expect(input.street).toEqual(invoice?.street);
    expect(input.number).toEqual(invoice?.number);
    expect(input.complement).toEqual(invoice?.complement);
    expect(input.city).toEqual(invoice?.city);
    expect(input.state).toEqual(invoice?.state);
    expect(input.zipCode).toEqual(invoice?.zipCode);
    expect(input.items.length).toEqual(2);
    expect(input.items[0].id).toEqual(invoice?.items[0].id);
    expect(input.items[1].id).toEqual(invoice?.items[1].id);
    expect(input.items[0].name).toEqual(invoice?.items[0].name);
    expect(input.items[1].name).toEqual(invoice?.items[1].name);
    expect(input.items[0].price).toEqual(invoice?.items[0].price);
    expect(input.items[1].price).toEqual(invoice?.items[1].price);
  });

  it('should find a invoice by facade', async () => {
    const inputFind = {
      id: '2',
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street 1',
      number: '1',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: 'ZipCode 1',
      items: [
        {
          id: '3',
          name: 'Item 1',
          price: 100
        },
        {
          id: '4',
          name: 'Item 2',
          price: 200
        }
      ]
    };

    const invoiceFacade = new InvoiceFacadeFactory().create();
    const savedInvoice = await invoiceFacade.generate(inputFind);

    const result = await invoiceFacade.find({ id: savedInvoice.id });

    expect(result).toBeDefined();
    expect(savedInvoice.id).toEqual(result?.id);
    expect(inputFind.name).toEqual(result?.name);
    expect(inputFind.document).toEqual(result?.document);
    expect(inputFind.street).toEqual(result?.address.street);
    expect(inputFind.number).toEqual(result?.address.number);
    expect(inputFind.complement).toEqual(result?.address.complement);
    expect(inputFind.city).toEqual(result?.address.city);
    expect(inputFind.state).toEqual(result?.address.state);
    expect(inputFind.zipCode).toEqual(result?.address.zipCode);
    expect(inputFind.items.length).toEqual(2);
    expect(inputFind.items[0].id).toEqual(result?.items[0].id);
    expect(inputFind.items[1].id).toEqual(result?.items[1].id);
    expect(inputFind.items[0].name).toEqual(result?.items[0].name);
    expect(inputFind.items[1].name).toEqual(result?.items[1].name);
    expect(inputFind.items[0].price).toEqual(result?.items[0].price);
    expect(inputFind.items[1].price).toEqual(result?.items[1].price);
    expect(300).toEqual(result?.total);
  });
});
