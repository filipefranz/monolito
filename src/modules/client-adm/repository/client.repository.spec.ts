import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from './client.model';
import ClientRepository from './client.repository';
import Client from '../domain/client.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../../@shared/domain/value-object/address';

describe('Client Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: '1@1.com',
      document: '1234-5678',
      address: new Address(
        'Rua 123',
        '99',
        'Casa Verde',
        'Criciúma',
        'SC',
        '88888-888'
      )
    });

    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const result = await ClientModel.findOne({
      where: { id: '1' }
    });

    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
    expect(result?.name).toBe('Client 1');
    expect(result?.email).toBe('1@1.com');
    expect(result?.document).toEqual(client.document);
    expect(result?.street).toEqual(client.address.street);
    expect(result?.number).toEqual(client.address.number);
    expect(result?.complement).toEqual(client.address.complement);
    expect(result?.city).toEqual(client.address.city);
    expect(result?.state).toEqual(client.address.state);
    expect(result?.zipCode).toEqual(client.address.zipCode);
    expect(result?.createdAt.toDateString()).toEqual(client.createdAt.toDateString());
    expect(result?.updatedAt.toDateString()).toEqual(client.updatedAt.toDateString());
  });

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: '1@1.com',
      document: '1234-5678',
      street: 'Rua 123',
      number: '99',
      complement: 'Casa Verde',
      city: 'Criciúma',
      state: 'SC',
      zipCode: '88888-888',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const clientRepository = new ClientRepository();
    const result = await clientRepository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.address.street).toEqual(client.street);
    expect(result.address.number).toEqual(client.number);
    expect(result.address.complement).toEqual(client.complement);
    expect(result.address.city).toEqual(client.city);
    expect(result.address.state).toEqual(client.state);
    expect(result.address.zipCode).toEqual(client.zipCode);
    expect(result.createdAt.toDateString()).toEqual(client.createdAt.toDateString());
    expect(result.updatedAt.toDateString()).toEqual(client.updatedAt.toDateString());
  });
});
