import * as vscode from 'vscode';
import * as services from './services';
import { serviceStorage } from './context';
import { MessageType, MethodType } from './types';
import { GLOBAL_COOKIE_KEY } from '../common/constants';
import type { ExtensionContext, WebviewPanel } from 'vscode';
import type { Message, MessageResponse } from './types';

const redirect = async (panel: WebviewPanel, to: string) => {
  panel.webview.postMessage({
    type: 'redirect',
    to,
  });
};

export const initService = (panel: WebviewPanel, context: ExtensionContext) => {
  const cookie = context.globalState.get(GLOBAL_COOKIE_KEY);

  if (!cookie) {
    // should redirect to login page.
    redirect(panel, '/login');
  }

  panel.webview.onDidReceiveMessage((message: Message) => {
    const { type, method, params, id } = message;
    if (type === MessageType.api) {
      if (services[method]) {
        serviceStorage.run(
          {
            panel,
            context,
          },
          async () => {
            try {
              let resp: Omit<MessageResponse, 'type' | 'id'> | null = null;
              switch (method) {
                case MethodType.login: {
                  resp = await services[MethodType.login](params);
                  break;
                }
                case MethodType.calendarItems: {
                  resp = await services[MethodType.calendarItems](params);
                  break;
                }
              }
              if (resp) {
                panel.webview.postMessage({
                  id,
                  type: MessageType.res,
                  ...resp,
                });
              }
            } catch (err) {
              vscode.window.showErrorMessage(`${err}`);
            }
          },
        );
      }
    }
  });
};
