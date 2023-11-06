import Address from '../../../@shared/domain/value-object/address';
import Id from '../../../@shared/domain/value-object/id.value-object';
import Client from '../../domain/client.entity';
import FindClientUseCase from './find-client.usecase';

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

const MockRepository = (): any => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(client)
  };
};

describe('Find Client UseCase unit test', () => {
  it('should find a client', async () => {
    const clientRepository = MockRepository();
    const usecase = new FindClientUseCase(clientRepository);

    const input = {
      id: '1'
    };

    const result = await usecase.execute(input);

    expect(clientRepository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
