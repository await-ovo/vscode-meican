import * as vscode from 'vscode';
import { initStatusBar } from './statusbar';
import { GLOBAL_COOKIE_KEY, OPEN_MEICAN_COMMAND } from './common/constants';
import { createPanel } from './panel';
import { initService } from './service';
import type { ExtensionContext } from 'vscode';

export function activate(context: ExtensionContext) {
  context.globalState.setKeysForSync([GLOBAL_COOKIE_KEY]);

  initStatusBar(context);

  // open main panel webview
  let disposable = vscode.commands.registerCommand(OPEN_MEICAN_COMMAND, () => {
    const panel = createPanel(context);
    initService(panel, context);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
