import BaseEntity from '../../@shared/domain/entity/base.entity';
import type Id from '../../@shared/domain/value-object/id.value-object';
import type Client from './client.entity';
import type Product from './product.entity';

interface OrderProps {
  id?: Id
  client: Client
  products: Product[]
  status: string
};

export default class Order extends BaseEntity {
  private readonly _client: Client;
  private readonly _products: Product[];
  private _status: string;

  constructor (props: OrderProps) {
    super(props.id);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status;
  }

  approved (): void {
    this._status = 'approved';
  }

  get client (): Client {
    return this._client;
  }

  get products (): Product[] {
    return this._products;
  }

  get status (): string {
    return this._status;
  }

  get total (): number {
    return this._products.reduce((total, product) => {
      return total + product.salesPrice;
    }, 0);
  }
}
