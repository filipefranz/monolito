import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../repository/client.model';
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../usecase/add-client/add-client.usecase';
import ClientAdmFacade from './clietn-adm.facade';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';

describe('Client Adm Facade', () => {
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
    const repository = new ClientRepository();
    const addUsecase = new AddClientUseCase(repository);
    const findUsecase = new FindClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase,
      findUsecase
    });

    const input = {
      id: '1',
      name: 'Client 1',
      email: '1@1.com',
      address: 'Address 1'
    };

    await facade.add(input);

    const result = await ClientModel.findOne({
      where: { id: '1' }
    });

    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
    expect(result?.name).toBe('Client 1');
    expect(result?.email).toBe('1@1.com');
  });

  it('should find a client', async () => {
    const facade = new ClientAdmFacadeFactory().create();

    const input = {
      id: '1',
      name: 'Client 1',
      email: '1@1.com',
      address: 'Address 1'
    };

    await facade.add(input);

    const client = await facade.find({ id: '1' });

    expect(client).toBeDefined();
    expect(client.id).toBe('1');
    expect(client.name).toBe('Client 1');
    expect(client.email).toBe('1@1.com');
    expect(client.address).toBe('Address 1');
  });
});
