import express, { type Request, type Response } from 'express';
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository';
import FindInvoiceUseCase from '../../../modules/invoice/usecase/find-invoice/find-invoice.usecase';

export const invoiceRoute = express.Router();

invoiceRoute.get('/:id', (req: Request, res: Response) => {
  void (async function () {
    const usecase = new FindInvoiceUseCase(new InvoiceRepository());

    try {
      const invoiceDto = {
        id: req.params.id
      };

      const output = await usecase.execute(invoiceDto);
      res.send(output);
    } catch (error) {
      res.status(500).send(error);
    }
  }());
});
