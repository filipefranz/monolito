import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from '../domain/invoice';
import InvoiceItem from '../domain/invoice-item';
import Address from '../domain/value-object/address';
import type InvoiceGateway from '../gateway/invoice.gateway';
import InvoiceItemModel from './invoice-item.model';
import InvoiceModel from './invoice.model';

export default class InvoiceRepository implements InvoiceGateway {
  async generate (input: Invoice): Promise<void> {
    try {
      await InvoiceModel.create(
        {
          id: input.id.id,
          name: input.name,
          document: input.document,
          street: input.address.street,
          number: input.address.number,
          complement: input.address.complement,
          city: input.address.city,
          state: input.address.state,
          zipCode: input.address.zipCode,
          items: input.items.map((item) => ({
            id: item.id.id,
            name: item.name,
            price: item.price
          })),
          createdAt: input.createdAt,
          updatedAt: input.updatedAt
        },
        {
          include: [{ model: InvoiceItemModel }]
        }
      );
    } catch (error) {
      // if (error instanceof Error) {
      //   throw new Error(error.message);
      // }
      console.log(error);
    }
  }

  async find (id: string): Promise<Invoice> {
    let invoice;

    try {
      invoice = await InvoiceModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ['items']
      });
    } catch (error) {
      throw new Error('Invoice not found');
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode
      }),
      items: invoice.items.map(item => new InvoiceItem({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    });
  }
}
