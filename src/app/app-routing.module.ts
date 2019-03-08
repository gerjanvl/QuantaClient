import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { AppComponent } from './app.component';
import { ManagementComponent } from './pages/management/management.component';
import { HomeComponent } from './pages/management/home/home.component';
import { ClientComponent } from './pages/management/client/client.component';
import { UsersComponent } from './pages/management/users/users.component';
import { DevicesComponent } from './pages/management/devices/devices.component';
import { MyDevicesComponent } from './pages/management/my-devices/my-devices.component';

const routes: Routes = [
    {
      path: '', component: ManagementComponent, canActivate: [AuthenticationGuard],
      children: [
        {path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [AuthenticationGuard]},
        { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
        { path: 'me/devices', component: MyDevicesComponent, canActivate: [AuthenticationGuard] },
        { path: 'devices', component: DevicesComponent, canActivate: [AuthenticationGuard] },
        { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard] }
      ],
    },
    { path: 'client/:id', component: ClientComponent, canActivate: [AuthenticationGuard]}

  ];
@NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }
