import { Component, OnInit } from '@angular/core';
import { GuacamoleApi } from 'src/app/api/guacamole.api';
import { Device } from 'src/app/api/Device';

@Component({
  selector: 'app-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.scss']
})
export class MyDevicesComponent implements OnInit {

  devices: Device[];

  constructor(private gucamoleApi: GuacamoleApi) {

   }

  async ngOnInit() {
    this.devices = await this.gucamoleApi.me.getDevices().toPromise();
  }
}
