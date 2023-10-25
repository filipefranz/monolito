import type AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import type Id from '../../@shared/domain/value-object/id.value-object';
import type InvoiceItems from './invoice-item';
import type Address from './value-object/address';

interface InvoiceProps {
  id?: Id
  name: string
  document: string
  address: Address
  items: InvoiceItems[]
  createdAt?: Date
  updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private readonly _name: string;
  private readonly _document: string;
  private readonly _address: Address;
  private readonly _items: InvoiceItems[];

  constructor (props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name (): string {
    return this._name;
  }

  get document (): string {
    return this._document;
  }

  get address (): Address {
    return this._address;
  }

  get items (): InvoiceItems[] {
    return this._items;
  }

  total (): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }
}
