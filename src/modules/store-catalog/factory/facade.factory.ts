import StoreCatalogFacade from '../facade/store.catalog.facade';
import ProductRepository from '../repository/product.repository';
import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase';
import FindProductUseCase from '../usecase/find-product/find-product.usecase';

export default class StoreCatalogFacadeFactory {
  create (): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    return new StoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase
    });
  }
}
