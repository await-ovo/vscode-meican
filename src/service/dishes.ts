import type { MethodType } from './types';
import { fetch } from '@/common/fetch';

export type DishesRequestMessage = {
  method: MethodType.dishes;
  params: {
    tabUniqueId: string;
    targetTime: string;
  };
};

export type Dish = {
  dishSectionId: number;
  id: number;
  name: string;
  isSection: boolean;
  priceString: string;
  restaurant: {
    name: string;
    uniqueId: string;
    available: boolean;
  };
};

export type DishesResponse = {
  data?: {
    myRegularDishList: Dish[];
    othersRegularDishList: Dish[];
    othersRegularDishListSource: string;
    showPrice: false;
  };
};

export const dishes = async (params: DishesRequestMessage['params']) =>
  fetch({
    url: 'preorder/api/v2.1/recommendations/dishes',
    params,
  });
