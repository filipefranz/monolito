import type ProductGateway from '../../gateway/product.gateway';
import { type CheckStockInputDto, type CheckStockOutputDto } from './check-stock.dto';

export default class CheckStockUseCase {
  private readonly _productRepository: ProductGateway;

  constructor (productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute (input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock
    };
  }
}
