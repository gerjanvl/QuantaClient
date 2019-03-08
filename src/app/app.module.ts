import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsAdalAngular6Module,AuthenticationGuard } from 'microsoft-adal-angular6';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GucamoleDeviceApi } from './api/device.api';
import { GucamoleMeApi } from './api/me.api';
import { GucamoleUserApi } from './api/user.api';
import { GuacamoleApi } from './api/guacamole.api';
import { TokenInterceptor } from './auth.interceptor';
import { ClientDisplayComponent } from './shared/client-display/client-display.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { ManagementComponent } from './pages/management/management.component';
import { UsersComponent } from './pages/management/users/users.component';
import { DevicesComponent } from './pages/management/devices/devices.component';
import { HomeComponent } from './pages/management/home/home.component';
import { ClientComponent } from './pages/management/client/client.component';
import { MyDevicesComponent } from './pages/management/my-devices/my-devices.component';
import { DetailPaneComponent } from './shared/detail-pane/detail-pane.component';
import { DetailPaneService } from './shared/detail-pane/detail-pane.service';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { monacoConfig } from './shared/json.schema';
import { FormsModule } from '@angular/forms';
import { BasicListComponent } from './shared/basic-list/basic-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientDisplayComponent,
    HeaderComponent,
    SideMenuComponent,
    ClientComponent,
    ManagementComponent,
    UsersComponent,
    DevicesComponent,
    HomeComponent,
    MyDevicesComponent,
    DetailPaneComponent,
    BasicListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
    MsAdalAngular6Module.forRoot({
      tenant: '',
      clientId: '',
      redirectUri: window.location.origin,
      endpoints: {
        "https://localhost:44308/api/v1.0/": "",
        "https://graph.microsoft.com": "https://graph.microsoft.com"
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    }),
  ],
  providers: [AuthenticationGuard, DetailPaneService, GucamoleDeviceApi, GucamoleMeApi, GucamoleUserApi, GuacamoleApi,  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
