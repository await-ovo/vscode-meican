import { AsyncLocalStorage } from 'async_hooks';
import type { ExtensionContext, WebviewPanel } from 'vscode';

export const serviceStorage = new AsyncLocalStorage<{
  panel: WebviewPanel;
  context: ExtensionContext;
}>();
