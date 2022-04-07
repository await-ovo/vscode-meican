import { invokeService } from '../utils';
import type { ApiResponse, AccountResponse } from '@/service/types';

import { MethodType } from '@/service/types';

export const getAccount = () =>
  invokeService<ApiResponse<AccountResponse>>({
    method: MethodType.account,
  });
