import type { MessageResponse, MethodType } from './types';

export type CalendarItemsRequestMessage = {
  method: MethodType.calendarItems;
  params: {
    beginDate: string;
    endDate: string;
  };
};

export enum CalendarItemStatus {
  notYet = 'NOT_YET',
  available = 'AVAILABLE',
  closed = 'CLOSED',
}

export type CalendarItemsResponse = {
  data?: {
    calendarItemList: Array<{
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
      openingTime: {};
      corpOrderUser: null;
      status: CalendarItemStatus;
      reason: string;
    }>;
  };
};

export const calendarItems = async (
  params: CalendarItemsRequestMessage['params'],
): Promise<MessageResponse> => {
  return { success: true };
};
