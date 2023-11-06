import express, { type Request, type Response } from 'express';
import PaymentFacadeFactory from '../../../modules/payment/factory/payment.facade.factory';

export const checkoutRoute = express.Router();

checkoutRoute.post('/', (req: Request, res: Response) => {
  void (async function () {
    try {
      const facade = new PaymentFacadeFactory().create();

      const paymentDto = {
        orderId: req.body.orderId,
        amount: req.body.amount
      };

      const output = await facade.process(paymentDto);
      res.status(200).send(output);
    } catch (err) {
      res.status(500).send(err);
    }
  }());
});
