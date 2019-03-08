import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnectionBuilder } from "@aspnet/signalr";
import Guacamole, { Tunnel } from "guacamole-common-js";
import { SignalRTunnel } from "./common/signalr.tunnel";
import { MsAdalAngular6Service } from "microsoft-adal-angular6";
import { GuacamoleApi } from './api/guacamole.api';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "guacamole-angular";

  constructor(private adalSvc: MsAdalAngular6Service, guacamoleClient: GuacamoleApi) {
  }

  private getGraphApiToken() {
    return this.adalSvc
      .acquireToken("https://graph.microsoft.com")
      .toPromise();
  }

  async ngOnInit() {
    await this.getGraphApiToken();
  }
}
