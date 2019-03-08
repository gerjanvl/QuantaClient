import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { DetailPaneService } from "src/app/shared/detail-pane/detail-pane.service";
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  @ViewChild('popupTemplateRef')
  private popupTemplateRef: TemplateRef<any>;
  currentRow = null;
  constructor(private detailPaneService: DetailPaneService,private adalSvc: MsAdalAngular6Service, private httpClient: HttpClient) {

  }
  handleRowClick(row) {
    this.currentRow = row;
    this.detailPaneService.open('edit-user', this.popupTemplateRef);
  }

  columns = [
    {
      highlighted: true,
      width: 320,
      fieldName: "principalDisplayName",
      caption: "Name",
      sorting: true
    },
    {
      highlighted: false,
      width: 200,
      fieldName: "principalType",
      caption: "Type",
      sorting: false
    },
    {
      highlighted: false,
      width: 200,
      fieldName: "principalId",
      caption: "Id",
      sorting: false
    }
  ];
  users = [];


  private getGraphApiToken() {
    return this.adalSvc
      .acquireToken("https://graph.microsoft.com")
      .toPromise();
  }

  async getUsers(token: string): Promise<any> {
    return this.httpClient.get('https://graph.microsoft.com/beta/servicePrincipals/76e9e0e2-6767-4267-a32a-84d99beed4ab/appRoleAssignments?$top=10', { headers: {  Authorization: `Bearer ${token}` }}).toPromise();
  }


  async ngOnInit() {
    this.users = (await this.getUsers(await this.getGraphApiToken())).value;

  }
}
