import type {
  CalendarItemsRequestMessage,
  CalendarItemsResponse,
} from './calendar-items';
import type { LoginRequestMessage, LoginResponse } from './login';

export enum MethodType {
  login = 'login',
  calendarItems = 'calendarItems',
}

export type MessageResponse = {
  success: boolean;
  message?: string;
} & (LoginResponse | CalendarItemsResponse);

export enum MessageType {
  api = 'api-request',
}

export type Message = {
  type: MessageType.api;
} & (LoginRequestMessage | CalendarItemsRequestMessage);
