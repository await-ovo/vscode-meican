import nodeFetch from 'node-fetch';
import { serviceStorage } from './context';
import { defaultRequestInit } from '../common/fetch';
import { API_BASE_URL, GLOBAL_COOKIE_KEY } from '../common/constants';
import { fetch } from '@/common/fetch';

export type AccountResponse = {
  data?: {
    email: string;
    mobileAccount: {
      mobileNumber: string;
      verified: boolean;
    };
    userUniqueNumber: number;
  };
};

const extractAuthToken = async (): Promise<string> => {
  const { context } = serviceStorage.getStore()!;

  const res = await nodeFetch(API_BASE_URL, {
    ...defaultRequestInit,
    method: 'GET',
    headers: {
      Accept: '*/*',
      Cookie: context.globalState.get(GLOBAL_COOKIE_KEY) ?? '',
    },
  });

  const text = await res.text();

  const matched = text.match(/accessToken:"(\w+)",/);

  return matched ? `Bearer ${matched[1]}` : '';
};

export const account = async () => {
  const token = await extractAuthToken();

  return fetch({
    url: 'forward/api/v2.1/accounts/show',
    params: {},
    headers: {
      Authorization: token,
    },
  });
};
