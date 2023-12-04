import { Socket } from 'socket.io';
import BaseClass from './base.class';

class BaseSocket extends BaseClass {
  event: string;

  constructor(event: string) {
    super();
    this.event = event;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler(socket: Socket, data: any) {
    console.log(data, socket);
  }
}

export default BaseSocket;
