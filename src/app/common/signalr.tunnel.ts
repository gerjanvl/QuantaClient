import Guacamole from 'guacamole-common-js';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import { GuacamoleInstruction } from './guacamole.instruction';


export class SignalRTunnel extends Guacamole.Tunnel {

    private _receiveTimeoutHandle: number;
    private _unstableTimeoutHandle: number;
    private _connection: HubConnection;

    constructor(builder: (hubConnectionBuilder: HubConnectionBuilder) => HubConnectionBuilder) {
      super();
      this._connection = builder(new HubConnectionBuilder()).build();
    }

    connect = (data: any) => {
        (this as any).setState(Guacamole.Tunnel.State.CONNECTING);
        this.resetTimeout();
        this._connection.start()
            .then(() => {
                this._connection.on('connected', (connectionId: string) => {
                  (this as any).uuid = connectionId;
                  (this as any).setState(Guacamole.Tunnel.State.OPEN);
                  this.resetTimeout();
                });

                this._connection.on('instruction', (instruction: GuacamoleInstruction) => {
                  (this as any).oninstruction(instruction.opCode, instruction.args);
                  this.resetTimeout();
                });

                this._connection.send('connect', data);
            }).catch((err) => {
               (this as any).setState(Guacamole.Tunnel.State.CLOSED);
                console.error(err);
            });
    }

    closeTunnel(status) {
        window.clearTimeout(this._receiveTimeoutHandle);
        window.clearTimeout(this._unstableTimeoutHandle);

        if ((this as any).state === Guacamole.Tunnel.State.CLOSED) {
            return;
        }

        if (status.code !== Guacamole.Status.Code.SUCCESS && (this as any).onerror) {
          (this as any).onerror(status);
        }

        this.disconnect();
    }

    resetTimeout() {
        window.clearTimeout(this._receiveTimeoutHandle);
        window.clearTimeout(this._unstableTimeoutHandle);

        if ((this as any).state === Guacamole.Tunnel.State.UNSTABLE) {
          (this as any).setState(Guacamole.Tunnel.State.OPEN);
        }

        this._receiveTimeoutHandle = window.setTimeout(function () {
          this.closeTunnel(new Guacamole.Status(Guacamole.Status.Code.UPSTREAM_TIMEOUT, 'Server timeout.'));
        }.bind(this), (this as any).receiveTimeout);


        this._unstableTimeoutHandle = window.setTimeout(function() {
          this.setState(Guacamole.Tunnel.State.UNSTABLE);
        }.bind(this), (this as any).unstableThreshold);
    }

    disconnect = () => {
        (this as any).setState(Guacamole.Tunnel.State.CLOSED);
        this._connection.stop();
    }

    sendMessage = (opCode: string, ...args: any[]) => {
        this._connection.send('WriteInstruction', <GuacamoleInstruction>{ opCode: opCode, args: args.map(o => o.toString()) });
    }
}
