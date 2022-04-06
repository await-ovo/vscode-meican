import type { MethodType, CalendarItemStatus, RestaurantItem } from './types';
import { fetch } from '@/common/fetch';

export type CalendarItemsRequestMessage = {
  method: MethodType.calendarItems;
  params: {
    beginDate: string;
    endDate: string;
  };
};

export type CalendarItem = {
  targetTime: number;
  title: string;
  userTab: {
    corp: {
      uniqueId: string;
      useCloset: boolean;
      name: string;
      namespace: string;
      alwaysOpen: boolean;
      addressList: {
        uniqueId: string;
        address: string;
        corpAddressCode: string;
        pickUpLocation: string;
      }[];
      isAdmin: boolean;
    };
    name: string;
    lastUsedTime: number;
    uniqueId: string;
  };
  openingTime: {
    name: string;
    openTime: string;
    closeTime: string;
    postboxOpenTime: string;
  };
  corpOrderUser: null | {
    uniqueId: string;
    restaurantItemList: RestaurantItem[];
  };
  status: CalendarItemStatus;
  reason: string;
};

export type CalendarItemsResponse = {
  data?: {
    startDate: string;
    endDate: string;
    dateList: Array<{
      date: string;
      calendarItemList: Array<CalendarItem>;
    }>;
  };
};

export const calendarItems = async (
  params: CalendarItemsRequestMessage['params'],
) =>
  fetch({
    url: 'preorder/api/v2.1/calendaritems/list',
    params: {
      withOrderDetail: false,
      ...params,
    },
  });
