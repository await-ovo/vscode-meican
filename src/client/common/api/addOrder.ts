import { invokeService } from '../utils';
import type {
  ApiResponse,
  OrderRequestMessage,
  OrderResponse,
} from '@/service/types';
import { MethodType } from '@/service/types';

export const addOrder = (params: OrderRequestMessage['params']) =>
  invokeService<ApiResponse<OrderResponse>>({
    method: MethodType.order,
    params,
  });
