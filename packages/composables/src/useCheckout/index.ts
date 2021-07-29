import { Order } from './../../../api-client/src/types/GraphQL';
import { Context } from '@vue-storefront/core';
import { useCheckoutFactory, UseCheckoutFactoryParams } from '../factories/useCheckoutFactory';
import useCart from '../useCart';

const params: UseCheckoutFactoryParams<Order> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  load: async (context:Context, params: { cartId?: string }) => {
    let cartId = params?.cartId;
    if (!cartId) {
      cartId = context.cart?.cart?.value?.id;
    }
    const checkoutResponse = await context.$kibo.api.getOrCreateCheckoutFromCart({cartId});
    return [checkoutResponse.data?.order];
  }
};

export default useCheckoutFactory<Order>(params);