import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import TransactionModel from '../../../modules/payment/repository/transaction.model';
import { app } from '../express';

describe('E2E test for checkout', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should make checkout with success', async () => {
    const response = await request(app).post('/checkout').send({
      orderId: '123',
      amount: 100
    });

    expect(response.status).toBe(200);
    expect(response.body.transactionId).toBeDefined();
    expect(response.body.amount).toBe(100);
    expect(response.body.orderId).toBe('123');
    expect(response.body.status).toBe('approved');
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  it('should not make checkout', async () => {
    const response = await request(app).post('/checkout').send({});

    expect(response.status).toBe(500);
  });
});
