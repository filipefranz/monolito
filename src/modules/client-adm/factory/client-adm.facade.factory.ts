import ClientAdmFacade from '../facade/clietn-adm.facade';
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../usecase/add-client/add-client.usecase';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';

export default class ClientAdmFacadeFactory {
  create (): ClientAdmFacade {
    const repository = new ClientRepository();
    const addUsecase = new AddClientUseCase(repository);
    const findUsecase = new FindClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase,
      findUsecase
    });

    return facade;
  }
}
