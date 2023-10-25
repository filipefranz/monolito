import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import InvoiceItemModel from './invoice-item.model';

@Table({
  tableName: 'invoices',
  timestamps: false
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare document: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: false })
  declare complement: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: false })
  declare zipCode: string;

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[];

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;
}
