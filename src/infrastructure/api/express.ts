import { Sequelize } from 'sequelize-typescript';
import express, { type Express } from 'express';
import { productRoute } from './routes/product.route';
import { ProductModel } from '../../modules/product-adm/repository/product.model';
import InvoiceModel from '../../modules/invoice/repository/invoice.model';
import InvoiceItemModel from '../../modules/invoice/repository/invoice-item.model';
import { clientRoute } from './routes/client.route';
import { ClientModel } from '../../modules/client-adm/repository/client.model';
import { checkoutRoute } from './routes/checkout.route';
import { invoiceRoute } from './routes/invoice.route';

export const app: Express = express();
app.use(express.json());
app.use('/products', productRoute);
app.use('/clients', clientRoute);
app.use('/checkout', checkoutRoute);
app.use('/invoice', invoiceRoute);

export let sequelize: Sequelize;

async function connect (): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: { force: true }
  });

  sequelize.addModels([ProductModel, ClientModel, InvoiceModel, InvoiceItemModel]);
  await sequelize.sync();
}

void connect();
