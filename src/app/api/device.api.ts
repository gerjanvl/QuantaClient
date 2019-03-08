import { ODataService } from '../odata/odata.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Device } from './Device';

@Injectable()
export class GucamoleDeviceApi extends ODataService<Device> {
  constructor(private httpClient: HttpClient) {
    super('https://localhost:5001/api/v1.0/devices/', httpClient);
  }
}
