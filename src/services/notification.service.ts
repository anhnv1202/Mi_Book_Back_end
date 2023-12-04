import { Config } from '@config/common.config';
import { io } from 'socket.io-client';

class _NotificationService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fireEvent(event: string, data: any) {
    const url = Config.APP_HOST;
    const socket = io(url);
    socket.emit(event, data);
  }
}

const NotificationService = new _NotificationService();

export default NotificationService;
