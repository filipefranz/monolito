import Address from '../../@shared/domain/value-object/address';
import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import type ClientGateway from '../gateway/client.gateway';
import { ClientModel } from './client.model';

export default class ClientRepository implements ClientGateway {
  async add (client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    });
  }

  async find (id: string): Promise<Client> {
    const client = await ClientModel.findOne({
      where: { id }
    });

    if (client == null) {
      throw new Error('Client not found');
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipCode
      ),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    });
  }
}
