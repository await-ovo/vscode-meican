import schedule from 'node-schedule';
import * as vscode from 'vscode';
import {
  NOTIFICATION_ORDER_ACTION,
  OPEN_MEICAN_COMMAND,
  TIME_TO_ORDER_TIPS,
} from './common/constants';

const actions: vscode.MessageItem[] = [
  {
    title: NOTIFICATION_ORDER_ACTION,
  },
];

const showNotification = async () => {
  const res = await vscode.window.showInformationMessage<vscode.MessageItem>(
    TIME_TO_ORDER_TIPS,
    {
      modal: true,
    },
    ...actions,
  );

  if (res?.title === NOTIFICATION_ORDER_ACTION) {
    vscode.commands.executeCommand(OPEN_MEICAN_COMMAND);
  }
};

export const initSchedule = () => {
  schedule.scheduleJob(
    {
      hour: 15,
      minute: 30,
      dayOfWeek: [new schedule.Range(1, 5)],
    },
    showNotification,
  );
};
