import PlaceOrderUseCase from './place-order.usecase';
import { type PlaceOrderInputDto } from './place-order.dto';
import Id from '../../../@shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';

describe('Place Order Use Case unit test', () => {
  describe('validateProducts method', () => {
    // @ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase();

    it('should throw an error if no products are selected', async () => {
      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: []
      };

      // @ts-expect-error - no params in constructor
      await expect(placeOrderUseCase.validateProducts(input)).rejects.toThrow(new Error('No products selected'));
    });

    it('should not throw an error when products is out of stock', async () => {
      const mockProductFacade = {
        checkStock: jest.fn(async ({ productId }: { productId: string }) =>
          await Promise.resolve({
            productId,
            stock: productId === '1' ? 0 : 1
          })
        )
      };

      // @ts-expect-error - force set productFacade
      placeOrderUseCase._productFacade = mockProductFacade;

      let input: PlaceOrderInputDto = {
        clientId: '0',
        products: [{ productId: '1' }]
      };

      // @ts-expect-error - no params in constructor
      await expect(placeOrderUseCase.validateProducts(input)).rejects.toThrow(
        new Error('Product 1 is not available in stock')
      );

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }]
      };

      // @ts-expect-error - no params in constructor
      await expect(placeOrderUseCase.validateProducts(input)).rejects.toThrow(
        new Error('Product 1 is not available in stock')
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }, { productId: '2' }]
      };

      // @ts-expect-error - no params in constructor
      await expect(placeOrderUseCase.validateProducts(input)).rejects.toThrow(
        new Error('Product 1 is not available in stock')
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
    });
  });

  describe('getProducts method', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date('2022-01-01T10:00:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    // @ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase();

    it('should throw an error when product not found', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null)
      };

      // @ts-expect-error - force set catalogFacade
      placeOrderUseCase._catalogFacade = mockCatalogFacade;

      // @ts-expect-error - private method
      await expect(placeOrderUseCase.getProduct('1')).rejects.toThrow(new Error('Product not found'));
    });

    it('should return a product', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 1
        })
      };

      // @ts-expect-error - force set catalogFacade
      placeOrderUseCase._catalogFacade = mockCatalogFacade;

      // @ts-expect-error - private method
      await expect(placeOrderUseCase.getProduct('1')).resolves.toEqual(
        new Product({
          id: new Id('1'),
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 1
        }));
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });
  describe('execute method', () => {
    it('should throw an error when client is not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null)
      };

      // @ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();
      // @ts-expect-error - force set clientFacade
      placeOrderUseCase._clientFacade = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: []
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('Client not found'));
    });

    it('should throw an error when products are not valid', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true)
      };

      // @ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      const mockValidateProducts = jest
      // @ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, 'validateProducts')
      // @ts-expect-error - not return never
        .mockRejectedValue(new Error('No products selected'));

      // @ts-expect-error - force set clientFacade
      placeOrderUseCase._clientFacade = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: []
      };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('No products selected'));
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('placean order', () => {
    const clientProps = {
      id: '1c',
      name: 'Client 1',
      email: 'a@b.com',
      document: '00000000000',
      address: {
        street: 'Street',
        number: 123,
        complement: 'Complement',
        city: 'City',
        state: 'State',
        zipCode: '00000000'
      }
    };

    const mockClientFacade = {
      find: jest.fn().mockResolvedValue(clientProps),
      add: jest.fn()
    };

    const mockPaymentFacade = {
      process: jest.fn()
    };

    const mockCheckoutRepository = {
      addOrder: jest.fn()
    };

    const mockInvoiceFacade = {
      generate: jest.fn().mockResolvedValue({
        id: '1i'
      })
    };

    const mockProductFacade = {
      addProduct: jest.fn(),
      checkStock: jest.fn()
    };

    const mockStoreCatalogFacade = {
      find: jest.fn(),
      findAll: jest.fn()
    };

    const placeOrderUseCase = new PlaceOrderUseCase(
      mockClientFacade as any,
      mockProductFacade as any,
      mockStoreCatalogFacade,
      mockCheckoutRepository as any,
      mockInvoiceFacade as any,
      mockPaymentFacade
    );

    const products = {
      1: new Product({
        id: new Id('1'),
        name: 'Product 1',
        description: 'Product 1 description',
        salesPrice: 10
      }),
      2: new Product({
        id: new Id('2'),
        name: 'Product 2',
        description: 'Product 2 description',
        salesPrice: 20
      })
    };

    const mockValidateProducts = jest
    // @ts-expect-error - spy on priavte method
      .spyOn(placeOrderUseCase, 'validateProducts')
    // @ts-expect-error - spy on priavte method
      .mockResolvedValue(null);

    const mockGetProduct = jest
    // @ts-expect-error - spy on priavte method
      .spyOn(placeOrderUseCase, 'getProduct')
    // @ts-expect-error - not return never
      .mockImplementation((productId: keyof typeof products) => {
        return products[productId];
      });

    it('should not be approved', async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        amount: 10,
        status: 'error',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const input: PlaceOrderInputDto = {
        clientId: '1c',
        products: [
          {
            productId: '1'
          },
          {
            productId: '2'
          }
        ]
      };

      const output = await placeOrderUseCase.execute(input);

      expect(output.invoiceId).toBeNull();
      expect(output.total).toBe(30);
      expect(output.products).toStrictEqual([
        {
          productId: '1'
        },
        {
          productId: '2'
        }
      ]);
      expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
      expect(mockValidateProducts).toHaveBeenCalledWith(input);
      expect(mockGetProduct).toHaveBeenCalledTimes(2);
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      });
      expect(mockInvoiceFacade.generate).not.toHaveBeenCalled();
    });

    it('should be approved', async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        amount: 10,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const input: PlaceOrderInputDto = {
        clientId: '1c',
        products: [{ productId: '1' }, { productId: '2' }]
      };

      const output = await placeOrderUseCase.execute(input);

      expect(output.invoiceId).toBe('1i');
      expect(output.total).toBe(30);
      expect(output.products).toStrictEqual([{ productId: '1' }, { productId: '2' }]);
      expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
      expect(mockGetProduct).toHaveBeenCalledTimes(2);
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      });
      expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
      expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
        name: clientProps.name,
        document: clientProps.document,
        street: clientProps.address.street,
        number: clientProps.address.number,
        complement: clientProps.address.complement,
        city: clientProps.address.city,
        state: clientProps.address.state,
        zipCode: clientProps.address.zipCode,
        items: [
          {
            id: products['1'].id.id,
            name: products['1'].name,
            price: products['1'].salesPrice
          },
          {
            id: products['2'].id.id,
            name: products['2'].name,
            price: products['2'].salesPrice
          }
        ]
      });
    });
  });
});
