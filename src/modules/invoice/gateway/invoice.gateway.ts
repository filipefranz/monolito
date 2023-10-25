import type Invoice from '../domain/invoice';

export default interface InvoiceGateway {
  generate: (input: Invoice) => Promise<void>
  find: (input: string) => Promise<Invoice>
}
