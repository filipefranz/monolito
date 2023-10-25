import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import InvoiceModel from './invoice.model';

@Table({
  tableName: 'invoice_items',
  timestamps: false
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: string;

  // @BelongsTo(() => InvoiceModel)
  // declare invoice: Awaited<InvoiceModel>;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
