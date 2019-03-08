import { Injectable } from '@angular/core';
import { GucamoleUserApi } from './user.api';
import { GucamoleMeApi } from './me.api';
import { GucamoleDeviceApi } from './device.api';
@Injectable()
export class GuacamoleApi {

  get me() { return this.meApi; }
  get users() { return this.userApi; }
  get devices() { return this.deviceApi; }

  constructor(private userApi: GucamoleUserApi, private deviceApi: GucamoleDeviceApi, private meApi: GucamoleMeApi) {

  }

}

