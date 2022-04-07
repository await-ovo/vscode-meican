import type { AccountResponse } from './account';
import type { OrderRequestMessage, OrderResponse } from './order';
import type { DishesResponse, DishesRequestMessage, Dish } from './dishes';
import type {
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
  CalendarItem,
  Address,
} from './calendar-items';
import type { LoginRequestMessage, LoginResponse, LoginParams } from './login';
import type {
  OrderDetailResponse,
  OrderDetailRequestMessage,
  RestaurantItem,
  OrderInfo,
} from './order-detail';

export enum MethodType {
  login = 'login',
  calendarItems = 'calendarItems',
  dishes = 'dishes',
  order = 'order',
  deleteOrder = 'deleteOrder',
  account = 'account',
  orderDetail = 'orderDetail',
}

export enum MessageType {
  api = 'api-request',
  res = 'api-response',
  refresh = 'refresh-webview',
}

export type MessageResponse = {
  id: string;
  type: MessageType.res;
  success: boolean;
  message?: string;
} & (
  | LoginResponse
  | CalendarItemsResponse
  | DishesResponse
  | OrderDetailResponse
  | OrderResponse
  | AccountResponse
);

export type Message = {
  id: string;
  type: MessageType.api | MessageType.refresh;
} & (
  | LoginRequestMessage
  | CalendarItemsRequestMessage
  | DishesRequestMessage
  | OrderDetailRequestMessage
  | OrderRequestMessage
  | {
      method: MethodType.account;
      params: void;
    }
);

export type ApiResponse<T> = Omit<
  Extract<MessageResponse, T & Pick<MessageResponse, 'success' | 'message'>>,
  'id' | 'type'
>;

export enum CalendarItemStatus {
  notYet = 'NOT_YET',
  available = 'AVAILABLE',
  closed = 'CLOSED',
  order = 'ORDER',
}

export type {
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
  CalendarItem,
  Address,
  LoginRequestMessage,
  LoginResponse,
  LoginParams,
  DishesRequestMessage,
  DishesResponse,
  Dish,
  OrderDetailRequestMessage,
  OrderDetailResponse,
  RestaurantItem,
  OrderInfo,
  OrderRequestMessage,
  OrderResponse,
  AccountResponse,
};
