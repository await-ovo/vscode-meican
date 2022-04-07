import { useState, useEffect } from 'react';
import type { ApiResponse, MessageResponse } from '@/service/types';

export function useRequest<T, U extends Pick<MessageResponse, 'data'>>(
  fn: (params: T) => Promise<ApiResponse<U>>,
  params?: T,
  key?: string,
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<U['data']>();

  useEffect(
    () => {
      console.log('fetch ----_>', fn);
      const doFetch = async () => {
        setLoading(true);

        const res = await fn(params || ({} as T));

        setLoading(false);

        if (res.success) {
          setData(res.data);
        }
      };

      doFetch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    key ? [key, fn] : [fn],
  );

  return {
    data,
    loading,
  };
}
