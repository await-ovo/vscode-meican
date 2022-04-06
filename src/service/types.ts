import type { DishesResponse, DishesRequestMessage, Dish } from './dishes';
import type {
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
  CalendarItem,
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
  accounts = 'accounts',
  orderDetail = 'orderDetail',
}

export enum MessageType {
  api = 'api-request',
  res = 'api-response',
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
);

export type Message = {
  id: string;
  type: MessageType.api;
} & (
  | LoginRequestMessage
  | CalendarItemsRequestMessage
  | DishesRequestMessage
  | OrderDetailRequestMessage
);

export type ApiResponse<T> = Omit<
  Extract<MessageResponse, T & Pick<MessageResponse, 'success' | 'message'>>,
  'id' | 'type'
>;

export enum CalendarItemStatus {
  notYet = 'NOT_YET',
  available = 'AVAILABLE',
  closed = 'CLOSED',
}

export type {
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
  CalendarItem,
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
};
