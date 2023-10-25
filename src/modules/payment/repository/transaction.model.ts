import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'transactions',
  timestamps: false
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare amount: number;

  @Column({ allowNull: false, field: 'order_id' })
  declare orderId: string;

  @Column({ allowNull: false })
  declare status: string;

  @Column({ allowNull: false, field: 'created_at' })
  declare createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  declare updatedAt: Date;
}
