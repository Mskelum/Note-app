import PushNotification from 'react-native-push-notification';
import { Vibration } from 'react-native';

export const scheduleNotification = (task) => {
  PushNotification.localNotificationSchedule({
    title: task.title,
    message: task.description,
    date: new Date(task.startTime),
    allowWhileIdle: true,
  });
  setTimeout(() => Vibration.vibrate(), new Date(task.startTime) - Date.now());
};
