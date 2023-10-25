import type UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import type InvoiceRepository from '../../repository/invoice.repository';
import { type FindInvoiceUseCaseInputDTO, type FindInvoiceUseCaseOutputDTO } from './find-invoice.dto';

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor (private readonly invoiceRepository: InvoiceRepository) {}

  async execute (input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode
      },
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt
    };
  }
}
