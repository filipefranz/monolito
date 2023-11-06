import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for client', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'Customer 1',
      email: 'Email 1',
      document: 'Document 1',
      address: {
        street: 'Street 1',
        number: 1,
        complement: 'Complement 1',
        city: 'City 1',
        state: 'State 1',
        zipCode: 'Zipcode 1'
      }
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Customer 1');
    expect(response.body.email).toBe('Email 1');
    expect(response.body.document).toBe('Document 1');
    expect(response.body.address._street).toBe('Street 1');
    expect(response.body.address._number).toBe(1);
    expect(response.body.address._zipCode).toBe('Zipcode 1');
    expect(response.body.address._city).toBe('City 1');
    expect(response.body.address._state).toBe('State 1');
    expect(response.body.address._complement).toBe('Complement 1');
  });

  it('should not create a client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'Customer 2'
    });

    expect(response.status).toBe(500);
  });
});
