import { toast } from 'react-toastify';
import { vscode } from './vscode';
import type { Message } from '@/service/types';
import { MessageType } from '@/service/types';

const callbacks: Record<
  string,
  {
    resolve: (value: any) => void;
  }
> = {};

window.addEventListener('message', ({ data }) => {
  const { type, id, success, message } = data;

  if (!success) {
    toast.error(message);
  }

  if (type === MessageType.res && callbacks.hasOwnProperty(id)) {
    callbacks[id].resolve(data);
  }
});

export const invokeService = <T>(
  message: Partial<Omit<Message, 'type' | 'id'>>,
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    try {
      const id = `${new Date().getTime()}-${message.method}`;
      vscode.postMessage({
        id,
        type: MessageType.api,
        ...message,
      });

      callbacks[id] = {
        resolve,
      };
    } catch (err) {
      reject(err);
    }
  });
