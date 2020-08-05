import {PUT_CLIENT_SOCKET, REMOVE_CLIENT_SOCKET} from './types';

interface State {
  socket: SocketIOClient.Socket | undefined;
}

const initialState: State = {
  socket: undefined
}

export const appReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PUT_CLIENT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case REMOVE_CLIENT_SOCKET:
      return {
        ...state,
        socket: undefined
      };
    default:
      return state;
  }
}
