import { invokeService } from '../utils';
import type {
  ApiResponse,
  DishesRequestMessage,
  DishesResponse,
} from '@/service/types';

import { MethodType } from '@/service/types';

export const getDishes = (
  params: DishesRequestMessage['params'],
): Promise<ApiResponse<DishesResponse>> =>
  invokeService<ApiResponse<DishesResponse>>({
    method: MethodType.dishes,
    params,
  });
