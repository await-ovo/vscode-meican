import fetch from 'node-fetch';
import { serialize as serializeCookie } from 'cookie';
import { parse as parseCookieHeaders } from 'set-cookie-parser';
import { serviceStorage } from './context';
import { defaultRequestInit } from '../common/create-fetch';
import { GLOBAL_COOKIE_KEY } from '../common/constants';
import type { MethodType, MessageType, MessageResponse } from './types';

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginRequestMessage = {
  method: MethodType.login;
  params: LoginParams;
};

export type LoginResponse = {
  data?: {
    cookie: string;
  };
};

export const login = async (params: LoginParams): Promise<MessageResponse> => {
  const body = new URLSearchParams({
    ...params,
    remember: 'true',
    openId: '',
    redirectUrl: '',
  });

  const resp = await fetch('account/directlogin', {
    ...defaultRequestInit,
    method: 'POST',
    body,
    redirect: 'manual',
    headers: {
      Accept: '*/*',
      'Content-Type': ' application/x-www-form-urlencoded',
      Host: ' meican.com',
      Origin: ' https://meican.com',
      Referer: ' https://meican.com/login',
    },
  });

  const setCookie = resp.headers.raw()['set-cookie'];

  if (setCookie?.length) {
    const cookies = parseCookieHeaders(setCookie);
    const cookieStr = cookies
      .map(cookie => serializeCookie(cookie.name, cookie.value))
      .join('; ');

    // update cookie in global state.
    const { context } = serviceStorage.getStore()!;

    context.globalState.update(GLOBAL_COOKIE_KEY, cookieStr);

    return { data: { cookie: cookieStr }, success: true };
  } else {
    return {
      success: false,
      message: '[meican]: request login failed for some reason',
    };
  }
};
