import { invokeService } from '../utils';
import type {
  ApiResponse,
  OrderDetailRequestMessage,
  OrderDetailResponse,
} from '@/service/types';

import { MethodType } from '@/service/types';

export const getOrderDetail = (params: OrderDetailRequestMessage['params']) =>
  invokeService<ApiResponse<OrderDetailResponse>>({
    method: MethodType.orderDetail,
    params,
  });
