import https from 'https';
import nodeFetch from 'node-fetch';
import * as vscode from 'vscode';
import {
  API_BASE_URL,
  GLOBAL_COOKIE_KEY,
  API_CLIENT_SECRET,
  API_CLIENT_ID,
} from './constants';
import type { RequestInit, HeadersInit } from 'node-fetch';
import type { MessageResponse } from '@/service/types';
import { serviceStorage } from '@/service/context';

export const defaultRequestInit: RequestInit = {
  insecureHTTPParser: true,
  agent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
};

type FailStatusResponse = {
  error_description: string;
  error: string;
};

type FetchResponse = Omit<MessageResponse, 'id' | 'type'>;

export const fetch = async ({
  method,
  url,
  params,
  headers,
}: {
  method?: 'GET' | 'POST';
  url: string;
  params: Record<string, string>;
  headers?: HeadersInit;
}): Promise<FetchResponse> => {
  const { context } = serviceStorage.getStore()!;

  const reqHeaders: HeadersInit = {
    Accept: 'application/json',
    Cookie: context.globalState.get(GLOBAL_COOKIE_KEY) ?? '',
    ...(headers ?? {}),
  };

  const reqMethod = method ?? 'GET';

  let reqUrl = url;

  if (reqMethod === 'GET') {
    reqUrl = `${url}?${new URLSearchParams({
      ...params,
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET,
    })}`;
  } else if (reqMethod === 'POST') {
    reqUrl = `${url}?${new URLSearchParams({
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET,
    })}`;
  }

  const res = await nodeFetch(`${API_BASE_URL}/${reqUrl}`, {
    ...defaultRequestInit,
    method: reqMethod,
    headers: reqHeaders,
    body: reqMethod === 'POST' ? new URLSearchParams(params) : undefined,
  });

  if (!res.headers.get('content-type')?.includes('application/json')) {
    return {
      success: false,
      message: `api ${url} 返回数据格式不正确, 请检查参数是否正确.`,
    };
  }

  const json = await res.json();

  if (res.status !== 200) {
    return {
      success: false,
      message:
        (json as FailStatusResponse)?.error_description ??
        `api ${url} response status code: ${res.status}`,
    };
  }

  return {
    success: true,
    data: json as FetchResponse['data'],
  };
};
