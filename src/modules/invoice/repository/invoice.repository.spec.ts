import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from '../domain/invoice';
import InvoiceItem from '../domain/invoice-item';
import Address from '../domain/value-object/address';
import InvoiceItemModel from './invoice-item.model';
import InvoiceModel from './invoice.model';
import InvoiceRepository from './invoice.repository';

const invoiceItem1 = new InvoiceItem({
  id: new Id('1'),
  name: 'any_name',
  price: 100
});

const invoiceItem2 = new InvoiceItem({
  id: new Id('2'),
  name: 'any_name',
  price: 100
});

const invoice = new Invoice({
  id: new Id('1'),
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
  items: [invoiceItem1, invoiceItem2],
  createdAt: new Date(),
  updatedAt: new Date()
});

describe('InvoiceRepository', () => {
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

  it('should generate a invoice', async () => {
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ['items']
    });

    expect(result?.id).toBe(invoice.id.id);
    expect(result?.name).toBe(invoice.name);
    expect(result?.document).toBe(invoice.document);
    expect(result?.street).toBe(invoice.address.street);
    expect(result?.number).toBe(invoice.address.number);
    expect(result?.complement).toBe(invoice.address.complement);
    expect(result?.city).toBe(invoice.address.city);
    expect(result?.state).toBe(invoice.address.state);
    expect(result?.zipCode).toBe(invoice.address.zipCode);
    expect(result?.items.length).toBe(2);
    expect(result?.items[0].id).toBe(invoiceItem1.id.id);
    expect(result?.items[1].id).toBe(invoiceItem2.id.id);
    expect(result?.items[0].name).toBe(invoiceItem1.name);
    expect(result?.items[1].name).toBe(invoiceItem2.name);
    expect(result?.items[0].price).toBe(invoiceItem1.price);
    expect(result?.items[1].price).toBe(invoiceItem2.price);
    expect(result?.createdAt).toBeDefined();
    expect(result?.updatedAt).toBeDefined();
  });

  it('should find a invoice', async () => {
    const invoiceRepository = new InvoiceRepository();
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    },
    {
      include: [{ model: InvoiceItemModel }]
    });

    const result = await invoiceRepository.find(invoice.id.id);

    expect(result?.id.id).toBe(invoice.id.id);
    expect(result?.name).toBe(invoice.name);
    expect(result?.document).toBe(invoice.document);
    expect(result?.address.street).toBe(invoice.address.street);
    expect(result?.address.number).toBe(invoice.address.number);
    expect(result?.address.complement).toBe(invoice.address.complement);
    expect(result?.address.city).toBe(invoice.address.city);
    expect(result?.address.state).toBe(invoice.address.state);
    expect(result?.address.zipCode).toBe(invoice.address.zipCode);
    expect(result?.items.length).toBe(2);
    expect(result?.items[0].id.id).toBe(invoiceItem1.id.id);
    expect(result?.items[1].id.id).toBe(invoiceItem2.id.id);
    expect(result?.items[0].name).toBe(invoiceItem1.name);
    expect(result?.items[1].name).toBe(invoiceItem2.name);
    expect(result?.items[0].price).toBe(invoiceItem1.price);
    expect(result?.items[1].price).toBe(invoiceItem2.price);
    expect(result?.createdAt).toBeDefined();
    expect(result?.updatedAt).toBeDefined();
  });
});
