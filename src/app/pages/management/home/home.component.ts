import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/api/Device';
import { GuacamoleApi } from 'src/app/api/guacamole.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  devices: Device[];

  constructor(private gucamoleApi: GuacamoleApi) {

   }

  async ngOnInit() {
    this.devices = await this.gucamoleApi.me.getRecentDevices().toPromise();
  }

}
