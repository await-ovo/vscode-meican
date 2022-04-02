import * as vscode from 'vscode';
import { OPEN_MEICAN_COMMAND, STATUS_BAR_ID } from './common/constants';
import type { ExtensionContext, StatusBarItem } from 'vscode';

export const initStatusBar = (context: ExtensionContext) => {
  const statusBar = vscode.window.createStatusBarItem(
    STATUS_BAR_ID,
    vscode.StatusBarAlignment.Right,
  );

  statusBar.name = 'VSCode meican';

  statusBar.text = '$(dashboard) meican';

  statusBar.tooltip = '美餐';

  statusBar.command = OPEN_MEICAN_COMMAND;

  context.subscriptions.push(statusBar);

  statusBar.show();
};
