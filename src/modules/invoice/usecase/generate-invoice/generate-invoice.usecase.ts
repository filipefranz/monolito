import Id from '../../../@shared/domain/value-object/id.value-object';
import type UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import Invoice from '../../domain/invoice';
import InvoiceItem from '../../domain/invoice-item';
import Address from '../../domain/value-object/address';
import type InvoiceGateway from '../../gateway/invoice.gateway';
import { type GenerateInvoiceUseCaseInputDto, type GenerateInvoiceUseCaseOutputDto } from './generate-invoice.dto';

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor (
    private readonly invoiceRepository: InvoiceGateway
  ) {}

  async execute (input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode
      }),
      items: input.items.map((item) => {
        return new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        });
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const invoice = new Invoice(props);
    await this.invoiceRepository.generate(invoice);

    return {
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
      total: invoice.total()
    };
  }
}
