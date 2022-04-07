import type { MethodType } from './types';
import { fetch } from '@/common/fetch';

export type OrderRequestMessage = {
  method: MethodType.order;
  params: {
    addressUniqueId: string;
    dishId: number;
    tabUniqueId: string;
    targetTime: string;
  };
};

export type OrderResponse = {
  data?: {
    order: {
      uniqueId: string;
    };
  };
};

export const order = async (params: OrderRequestMessage['params']) =>
  fetch({
    method: 'POST',
    url: 'preorder/api/v2.1/orders/add',
    params: {
      corpAddressRemark: '',
      corpAddressUniqueId: params.addressUniqueId,
      userAddressUniqueId: params.addressUniqueId,
      tabUniqueId: params.tabUniqueId,
      targetTime: params.targetTime,
      order: {
        count: 1,
        dishId: params.dishId,
      },
      remarks: [
        {
          dishId: params.dishId,
          remark: '',
        },
      ],
    },
  });
