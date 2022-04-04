import { invokeService } from '../utils';
import type { LoginParams, LoginResponse, ApiResponse } from '@/service/types';
import { MethodType } from '@/service/types';

export const login = (
  params: LoginParams,
): Promise<ApiResponse<LoginResponse>> =>
  invokeService<ApiResponse<LoginResponse>>({
    method: MethodType.login,
    params,
  });
