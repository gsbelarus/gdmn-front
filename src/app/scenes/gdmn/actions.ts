import { ActionType, createAction } from 'typesafe-actions';

import { IWsMessageEventData } from '@core/gdmn-api/ws/IWsMessageEventData';

const gdmnWsActions = {
  wsConnect: createAction('gdmn/WS_CONNECT', resolve => {
    // TODO async
    return () => resolve();
  }),
  wsDisconnect: createAction('gdmn/WS_DISCONNECT', resolve => {
    // TODO async
    return () => resolve();
  }),
  wsSend: createAction('gdmn/WS_SEND', resolve => {
    // TODO async
    return (data: any) => resolve(data);
  }),
  // WebSocketEventMap
  wsOnOpen: createAction('gdmn/WS_ON_OPEN', resolve => {
    return () => resolve();
  }),
  wsOnClose: createAction('gdmn/WS_ON_CLOSE', resolve => {
    return () => resolve();
  }),
  wsOnMessage: createAction('gdmn/WS_ON_MESSAGE', resolve => {
    return (data: IWsMessageEventData) => resolve(data);
  }),
  wsOnError: createAction('gdmn/WS_ON_ERROR', resolve => {
    return (error: Error) => resolve(error);
  })
};

type TGdmnWsActions = ActionType<typeof gdmnWsActions>;

// FIXME
gdmnWsActions.wsOnError = (error: Error) => ({
  type: 'gdmn/WS_ON_ERROR',
  payload: error,
  error: true
});

export { gdmnWsActions, TGdmnWsActions };
