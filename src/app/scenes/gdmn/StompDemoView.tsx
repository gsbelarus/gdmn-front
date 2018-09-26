import React, { Component, Fragment, PureComponent, RefObject, SFC } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import {
  Stomp,
  Client,
  closeEventCallbackType,
  Frame,
  frameCallbackType,
  Message,
  messageCallbackType,
  StompHeaders,
  StompSubscription
} from '@stomp/stompjs';
import { WebStorage, WebStorageType } from '@core/services/WebStorage';
import { Auth } from '@core/services/Auth';


interface IStompDemoViewState {
  ackChecked: boolean;
  log: string;
  sendAction: string;
  sendBody: string;
  destination: string;
}

interface IStompDemoViewProps {}


const genId = () => (Math.floor(Math.random() * (10000000 - 10000)) + 10000).toString();

const client = new Client({
  brokerURL: 'ws://192.168.0.56:4000',
  connectHeaders: {
    access_token: ''
  },
  // disconnectHeaders
  debug(str) {
    console.log(str);
  },
  reconnectDelay: 100000000,
  // heartbeatIncoming: 100000000,
  // heartbeatOutgoing: 100000000
  // webSocketFactory
});
client.onUnhandledMessage = (message: Message) => {
  console.log('onUnhandledMessage()');
};
client.onUnhandledReceipt = (receipt: Frame) => {
  console.log('onUnhandledReceipt()');
};
client.onUnhandledFrame = (receipt: Frame) => {
  console.log('onUnhandledFrame()');
};
// client.beforeConnect
client.onConnect = (receipt: Frame) => {
  console.log('onConnect()');
};
// client.onDisconnect = (receipt: Frame) => { console.log('onDisconnect()') };
client.onStompError = (receipt: Frame) => {
  console.log('onStompError()');
};
client.onWebSocketClose = (evt: CloseEvent) => {
  console.log('onWebSocketClose()');
};
// client.watchForReceipt(receiptId, (receipt: Frame) => {
//   // Will be called after server acknowledges
//   console.log('watchForReceipt()');
// });

// Stomp.over(() => {
//   const ws = new WebSocket('ws://192.168.0.56:4000');
//   return ws;
// });

let subscription: StompSubscription | null = null;


class StompDemoView extends PureComponent<IStompDemoViewProps, IStompDemoViewState> {
  public state: IStompDemoViewState = {
    ackChecked: true,
    log: '',
    sendBody: JSON.stringify({ uid: 'test' }),
    sendAction: 'INIT_APP',
    destination: '/task'
  };

  public componentDidMount() {
    new Auth(new WebStorage(WebStorageType.local, { namespace: 'gdmn::' })).getAccessToken().then(
      (accessToken) => {
        client.connectHeaders = { access_token: accessToken + '' };
      });
  }

  public render() {
    const {} = this.props;

    return (
      <div>
        <Button variant="contained" size="small" style={{ margin: 20 }} onClick={this.handleConnect}>
          Connect
        </Button>
        <Button variant="contained" size="small" style={{ margin: 20 }} onClick={this.handleDisconnect}>
          Disconnect
        </Button>
        <Button variant="contained" size="small" style={{ margin: 20 }} onClick={this.handleForceDisconnect}>
          Force Disconnect
        </Button>
        <Button variant="contained" size="small" style={{ margin: 20 }} onClick={this.handleSend}>
          Send
        </Button>
        <Button variant="contained" size="small" style={{ margin: 20 }} onClick={this.handleSubscribe}>
          Subscribe
        </Button>
        <Button variant="contained" size="small" style={{ margin: 20 }} onClick={this.handleUnsubscribe}>
          Unsubscribe
        </Button>
        <FormControlLabel
          control={<Checkbox checked={this.state.ackChecked} onChange={this.handleToggleAck} />}
          label="Ack receive message"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="SEND/SUBSCRIBE destination"
            value={this.state.destination}
            onChange={this.handleDestinationChange}
            margin="normal"
          />
          <TextField
            label="SEND header ACTION"
            value={this.state.sendAction}
            onChange={this.handleSendActionChange}
            margin="normal"
          />
          <TextField
            label="SEND body"
            multiline={true}
            value={this.state.sendBody}
            onChange={this.handleSendBodyChange}
            margin="normal"
          />
          <textarea
            style={{ width: '100%', minHeight: 300, resize: 'vertical', marginTop: 20, marginBottom: 20 }}
            disabled={true}
            value={this.state.log}
          />
        </div>
      </div>
    );
  }

  private handleToggleAck = () => {
    this.setState({
      ackChecked: !this.state.ackChecked
    });
  };

  private handleSendActionChange = (event: any) => {
    this.setState({
      sendAction: event.target.value
    });
  };

  private handleSendBodyChange = (event: any) => {
    this.setState({
      sendBody: event.target.value
    });
  };

  private handleDestinationChange = (event: any) => {
    this.setState({
      destination: event.target.value
    });
  };

  private handleSend = () => {
    console.log('Send...');

    client.publish({
      destination: this.state.destination,
      headers: { receipt: genId(), action: this.state.sendAction, 'content-type': 'application/json;charset=utf-8' },
      body: this.state.sendBody
    });
  };

  private handleConnect = () => {
    console.log('Connect...');

    client.debug = (msg: string) => this.setState({ log: this.state.log + '\n---\n' + msg });

    client.onDisconnect = (receipt: Frame) => {
      console.log('onDisconnect()');

      this.setState({ log: '' });
    };

    client.activate();
  };

  private handleSubscribe = () => {
    console.log('Subscribe...');

    subscription = client.subscribe(
      this.state.destination,
      message => {
        console.log('...Message');

        // const body = JSON.parse(message.body);
        if (this.state.ackChecked) message.ack();
      },
      {
        ack: 'client',
        receipt: genId()
      }
    );
  };

  private handleDisconnect() {
    console.log('Disconnect...');

    client.deactivate();
  }

  private handleUnsubscribe() {
    if (!subscription) return;
    console.log('Unsubscribe...');

    subscription.unsubscribe({ receipt: genId() });
    subscription = null;
  }

  private handleForceDisconnect() {
    console.log('Force Disconnect...');

    client.forceDisconnect();
  }
}

export { StompDemoView, IStompDemoViewProps, IStompDemoViewState };
