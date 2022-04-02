import https from 'https';
import nodeFetch from 'node-fetch';
import { API_BASE_URL, DEFAULT_TIMEOUT, GLOBAL_COOKIE_KEY } from './constants';
import type { RequestInit } from 'node-fetch';

export const defaultRequestInit: RequestInit = {
  method: 'GET',
  insecureHTTPParser: true,
  agent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
};
