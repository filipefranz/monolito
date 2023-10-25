import type UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import type ProductGateway from '../../gateway/product.gateway';

export default class FindAllProductsUseCase implements UseCaseInterface {
  constructor (private readonly productRepository: ProductGateway) { }

  async execute (): Promise<any> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map(product => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    };
  }
}
