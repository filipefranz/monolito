import Id from '../../../@shared/domain/value-object/id.value-object';
import Client from '../../domain/client.entity';
import type ClientGateway from '../../gateway/client.gateway';
import { type AddClientInputDto, type AddClientOutputDto } from './add-client.usecase.dto';

export default class AddClientUseCase {
  private readonly _clientRepository: ClientGateway;

  constructor (clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute (input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id) ?? new Id(),
      name: input.name,
      email: input.email,
      address: input.address
    };

    const client = new Client(props);
    await this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}
