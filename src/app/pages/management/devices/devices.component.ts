import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DetailPaneService } from 'src/app/shared/detail-pane/detail-pane.service';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { GuacamoleApi } from 'src/app/api/guacamole.api';
import { Device } from 'src/app/api/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @ViewChild('popupTemplateRef')
  private popupTemplateRef: TemplateRef<any>;
  devices: Device[] = [];
  jsonCode = [
    '{',
    '    "protocol": "rdp",',
    '    "hostname": "localhost",',
    '    "port": 3984',
    '}'
  ].join('\n');

  model = {
    value: this.jsonCode,
    language: 'json',
    uri: 'a://b/foo.json'
  };
  test: "ttea";

  columns = [{
    highlighted: true,
    width: 320,
    fieldName: 'name',
    caption: 'Name',
    sorting: true
  },{
    highlighted: false,
    width: 200,
    fieldName: 'operatingSystem',
    caption: 'Operating System',
    sorting: false
  }
];


  options = <any>{
    theme: 'vs-light',
    language: 'json',
    contextmenu: false,
    minimap: {
      enabled: false
    }
  };
  constructor(private detailPaneService: DetailPaneService, private guacamoleApi: GuacamoleApi) { }

   async refresh() {
    this.devices = await this.guacamoleApi.devices.get(o => o.top(10)).toPromise();
  }

  addDevice() {
    this.detailPaneService.open('addDevice', this.popupTemplateRef);
    this.jsonCode = this.jsonCode;
  }

  saveDevice() {

  }

  async ngOnInit() {
    this.devices = await this.guacamoleApi.devices.get(o => o.top(10)).toPromise();
  }

}
