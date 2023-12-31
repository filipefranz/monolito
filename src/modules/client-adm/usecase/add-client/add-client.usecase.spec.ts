import Address from '../../../@shared/domain/value-object/address';
import AddClientUseCase from './add-client.usecase';

const MockRepository = (): any => {
  return {
    add: jest.fn(),
    find: jest.fn()
  };
};

describe('Add Client UseCase unit test', () => {
  it('should add a new client', async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
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
    };

    const result = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.address).toEqual(input.address);
  });
});
