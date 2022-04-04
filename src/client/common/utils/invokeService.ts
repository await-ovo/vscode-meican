import type { Message } from '@/service/types';
import { MessageType } from '@/service/types';

const vscode = acquireVsCodeApi();

const callbacks: Record<
  string,
  {
    resolve: (value: any) => void;
  }
> = {};

window.addEventListener('message', ({ data: message }) => {
  const { type, id } = message;
  if (type === MessageType.res && callbacks.hasOwnProperty(id)) {
    callbacks[id].resolve(message);
  }
});

export const invokeService = <T>(
  message: Omit<Message, 'type' | 'id'>,
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
