import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imagePath: "";

  constructor(private adalSvc: MsAdalAngular6Service, private httpClient: HttpClient) {

  }

  private getGraphApiToken() {
    return this.adalSvc
      .acquireToken("https://graph.microsoft.com")
      .toPromise();
  }

  async getImage(imageUrl: string, token: string): Promise<Blob> {
    return this.httpClient.get(imageUrl, { headers: {  Authorization: `Bearer ${token}` }, responseType: 'blob' }).toPromise();
  }

  async ngOnInit() {
    const token = await this.getGraphApiToken();
    const imageBlob = await this.getImage("https://graph.microsoft.com/v1.0/me/photo/$value", token);
    const reader = new FileReader();
    reader.onload = function() {
      this.imagePath = reader.result;
    }.bind(this);
    reader.readAsDataURL(imageBlob);
  }

}
