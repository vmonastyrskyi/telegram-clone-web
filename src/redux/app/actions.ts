import {PUT_CLIENT_SOCKET, REMOVE_CLIENT_SOCKET} from './types';

export const putClientSocket = (socket: SocketIOClient.Socket) => {
  return {type: PUT_CLIENT_SOCKET, payload: socket};
}

export const removeClientSocket = () => {
  return {type: REMOVE_CLIENT_SOCKET};
}
