import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.description).toBe('Product 1 description');
    expect(response.body.purchasePrice).toBe(100);
    expect(response.body.stock).toBe(10);
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/products').send({
      name: ''
    });

    expect(response.status).toBe(500);
  });
});
