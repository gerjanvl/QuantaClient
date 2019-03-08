import { Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnectionBuilder } from "@aspnet/signalr";
import Guacamole, { Tunnel } from "guacamole-common-js";
import { SignalRTunnel } from "../../common/signalr.tunnel";
import { MsAdalAngular6Service } from "microsoft-adal-angular6";
import { GuacamoleApi } from '../../api/guacamole.api';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  @ViewChild("displayElement")
  displayElement: ElementRef;

  @Input()
  deviceId: string;

  @Output()
  onError = new EventEmitter();

  constructor(private adalSvc: MsAdalAngular6Service, guacamoleClient: GuacamoleApi) {

  }

  private getTunnel() {
    return new SignalRTunnel(builder => {
      builder.withUrl("https://localhost:5001/ws/", {
        accessTokenFactory: () => this.adalSvc.accessToken
      });
      return builder;
    });
  }

  private connect() {
    const tunnel = this.getTunnel();
    const client = new Guacamole.Client(tunnel);

    this.displayElement.nativeElement.appendChild(
      client.getDisplay().getElement()
    );

    const mouse = new Guacamole.Mouse(client.getDisplay().getElement());
    const display = client.getDisplay();

    mouse.onmousedown = mouse.onmouseup = mouse.onmousemove = function(mouseState) {
      client.sendMouseState(
        new Guacamole.Mouse.State(
          mouseState.x / display.getScale(),
          mouseState.y / display.getScale(),
          mouseState.left,
          mouseState.middle,
          mouseState.right,
          mouseState.up,
          mouseState.down
        )
      );
    };

    display.getElement().onclick = function(e) {
      e.preventDefault();
      return false;
    };

    const keyboard = new Guacamole.Keyboard(document);
    keyboard.onkeydown = function(keysym) {
      client.sendKeyEvent(1, keysym);
    };
    keyboard.onkeyup = function(keysym) {
      client.sendKeyEvent(0, keysym);
    };

    (tunnel as any).onstatechange = function(state) {
        if(state === Guacamole.Tunnel.State.CLOSED) {
          client.disconnect();
          //this.onError.emit("Server Timeout");
        }
    }.bind(this);

    client.onerror = function(error) {
      this.onError.emit(error);
    }.bind(this);

    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    client.connect({ deviceId: this.deviceId, width, height });
  }

  ngOnInit() {
    this.connect();
  }
}
