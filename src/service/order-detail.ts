import type { MethodType } from './types';
import { fetch } from '@/common/fetch';

export type OrderDetailRequestMessage = {
  method: MethodType.orderDetail;
  params: {
    uniqueId: string;
  };
};

export type RestaurantItem = {
  uniqueId: string;
  restaurantName: string;
  dishItemList: {
    dish: {
      name: string;
      isSection: boolean;
      id: number;
    };
    count: number;
  }[];
};

export type OrderInfo = {
  warning?: {
    backgroundColorCode: string;
    textColorCode: string;
    text: string;
  };
  corpOrderId: number;
  restaurantItemList: RestaurantItem[];
  corpAddress: {
    address: string;
    corpAddressCode: string;
    pickUpLocation: string;
    uniqueId: string;
  };
  pickUpMessage: string;
  progressList: {
    activity: string;
    timestamp: number;
  }[];
};

export type OrderDetailResponse = {
  data?: OrderInfo;
};

export const orderDetail = async (
  params: OrderDetailRequestMessage['params'],
) =>
  fetch({
    url: 'preorder/api/v2.1/orders/show',
    params: {
      x: new Date().getTime(),
      progressMarkdownSupport: true,
      type: 'CORP_ORDER',
      ...params,
    },
  });
