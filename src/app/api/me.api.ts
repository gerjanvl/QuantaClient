import { ODataService } from '../odata/odata.service';
import { HttpClient } from '@angular/common/http';
import { QueryStringBuilder } from '../odata/odata';
import { Injectable } from '@angular/core';
import { Device } from './Device';
@Injectable()
export class GucamoleMeApi {
  private baseUrl = 'https://localhost:5001/api/v1.0/me';
  constructor(private httpClient: HttpClient) {
  }
  getDevices(query?: (queryBuilder: QueryStringBuilder) => void) {
    const odataService = new ODataService<Device>(`${this.baseUrl}/devices`, this.httpClient);
    return odataService.get(query);
  }

  getRecentDevices(query?: (queryBuilder: QueryStringBuilder) => void) {
    const odataService = new ODataService<Device>(`${this.baseUrl}/recentDevices`, this.httpClient);
    return odataService.get(query);
  }
}
