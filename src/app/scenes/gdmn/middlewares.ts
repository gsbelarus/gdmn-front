import { Middleware } from 'redux';
import { getType } from 'typesafe-actions';
import Socket = SocketIOClient.Socket;

import { gdmnWsActions } from '@src/app/scenes/gdmn/actions';
import { TWsMessageEventDataTypeEnum } from '@core/gdmn-api/ws/wsMessageEventDataType';
import { GdmnApi } from '@src/app/services/GdmnApi';

const getWsMiddleware = (socket: Socket): Middleware => {
  return ({ dispatch, getState }) => next => async (action: any) => {
    // todo async
    switch (action.type) {
      case getType(gdmnWsActions.wsConnect):
        socket
          .on('connect', () => {
            console.log('ws: connected. Id: ' + socket.id);

            dispatch(gdmnWsActions.wsOnOpen());
          })
          .on('disconnect', (reason: String) => {
            console.log('ws: disconnected. Reason: ' + reason);

            dispatch(gdmnWsActions.wsOnClose());

            if (reason === 'io server disconnect') {
              // todo test
              socket.connect();
            }
          })
          .on('error', (error: Error) => {
            console.log('ws: error.' + error.toString());

            dispatch(gdmnWsActions.wsOnError(error));
          })
          .on(TWsMessageEventDataTypeEnum.BACKUP_FINISHED, (data: any) => {
            console.log('ws: backup finish');

            dispatch(gdmnWsActions.wsOnMessage({ type: TWsMessageEventDataTypeEnum.BACKUP_FINISHED, data }));
          })
          .on(TWsMessageEventDataTypeEnum.RESTORE_FINISHED, (data: any) => {
            console.log('ws: restore finish');

            dispatch(gdmnWsActions.wsOnMessage({ type: TWsMessageEventDataTypeEnum.RESTORE_FINISHED, data }));
          });
        // .on('reconnect_attempt', async () => {
        //   socket!.io.opts.query = {
        //     token: await apiService.getAccessToken()
        //   };
        // })

        socket.connect();

        console.log('token: ' + (<any>socket.io.opts.query).token);
        break;
      case getType(gdmnWsActions.wsDisconnect):
        socket.disconnect(); // todo test reconnect
        break;
      case getType(gdmnWsActions.wsSend):
        // todo
        break;
      // todo refresh token
    }

    return next(action);
  };
};

const getGdmnMiddlewares = (socket: Socket): Middleware[] => [getWsMiddleware(socket)];

export { getGdmnMiddlewares };
