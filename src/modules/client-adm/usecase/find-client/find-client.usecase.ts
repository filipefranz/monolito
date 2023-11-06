import Address from '../../../@shared/domain/value-object/address';
import type ClientGateway from '../../gateway/client.gateway';
import { type FindClientInputDto, type FindClientOutputDto } from './find-client.usecase.dto';

export default class FindClientUseCase {
  private readonly _clientRepository: ClientGateway;

  constructor (clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute (input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.address.street,
        client.address.number,
        client.address.complement,
        client.address.city,
        client.address.state,
        client.address.zipCode
      ),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}
