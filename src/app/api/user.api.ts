import { ODataService } from '../odata/odata.service';
import { HttpClient } from '@angular/common/http';
import { QueryStringBuilder } from '../odata/odata';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class GucamoleUserApi extends ODataService<User> {
  constructor(private httpClient: HttpClient) {
    super('https://localhost:5001/api/v1.0/users/', httpClient);
  }
  getDevices(userId: number, query?: (queryBuilder: QueryStringBuilder) => void) {
    return this.getCollectionProperty(userId, 'devices', query ? query : (q) => q);
  }
  addDevice(userId: number, deviceId: number) {
    return this.httpClient.post(`${this.baseUrl}/${userId}/devices/$ref`, {
      '@odata.id': `${this.baseUrl}/devices/${deviceId}`
    });
  }
  removeDevice(userId: number, deviceId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${userId}/devices/${deviceId}/$ref`);
  }
}
