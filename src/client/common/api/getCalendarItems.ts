import { invokeService } from '../utils';
import type {
  ApiResponse,
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
} from '@/service/types';
import { MethodType } from '@/service/types';

export const getCalendarItems = (
  params: CalendarItemsRequestMessage['params'],
): Promise<ApiResponse<CalendarItemsResponse>> =>
  invokeService<ApiResponse<CalendarItemsResponse>>({
    method: MethodType.calendarItems,
    params,
  });
