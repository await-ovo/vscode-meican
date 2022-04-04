import type {
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
  CalendarItem,
} from './calendar-items';
import type { LoginRequestMessage, LoginResponse, LoginParams } from './login';

export enum MethodType {
  login = 'login',
  calendarItems = 'calendarItems',
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
} & (LoginResponse | CalendarItemsResponse);

export type Message = {
  id: string;
  type: MessageType.api;
} & (LoginRequestMessage | CalendarItemsRequestMessage);

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
};
