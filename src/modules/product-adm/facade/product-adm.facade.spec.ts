import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../repository/product.model';
import ProductAdmFacadeFactory from '../factory/facade.factory';

describe('ProductAdmFacade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productFacade = new ProductAdmFacadeFactory().create();

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({
      where: { id: '1' }
    });

    expect(product).toBeDefined();
    expect(input.id).toEqual(product?.id);
    expect(input.name).toEqual(product?.name);
    expect(input.description).toEqual(product?.description);
    expect(input.purchasePrice).toEqual(product?.purchasePrice);
    expect(input.stock).toEqual(product?.stock);
  });

  it('should check a product  stock', async () => {
    const productFacade = new ProductAdmFacadeFactory().create();

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    };

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: '1' });

    expect(result.productId).toBe(input.id);
    expect(result.stock).toBe(input.stock);
  });
});
