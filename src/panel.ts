import path from 'path';
import * as vscode from 'vscode';
import { MAIN_PANEL_NAME, MAIN_PANEL_TITLE } from './common/constants';
import type { WebviewPanel, ExtensionContext } from 'vscode';

let currentPanel: WebviewPanel | undefined;

const getWebViewContent = (context: ExtensionContext) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="vscode-resource:${path.join(
      context.extensionPath,
      './dist/main.css',
    )}">
  </head>
  <body>
    <div id="root"></div>
    <script src="vscode-resource:${path.join(
      context.extensionPath,
      './dist/client.js',
    )}"></script>
  </body>
  </html>
`;

export const createPanel = (context: ExtensionContext) => {
  const column = vscode.window.activeTextEditor
    ? vscode.window.activeTextEditor.viewColumn
    : undefined;

  if (currentPanel) {
    currentPanel.reveal(column);
  } else {
    currentPanel = vscode.window.createWebviewPanel(
      MAIN_PANEL_NAME,
      MAIN_PANEL_TITLE,
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
      },
    );
  }

  currentPanel.webview.html = getWebViewContent(context);

  currentPanel.onDidDispose(() => {
    currentPanel = undefined;
  });

  return currentPanel;
};
