import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReportsContentComponent } from './components/reports-content/reports-content.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { RegisterServiceComponent } from './components/register-service/register-service.component';
import { FriendsResolver } from './resolvers/friends.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { ReportedServicesResolver } from './resolvers/reportedServices.resolver';
import { IsAuthorizeddGuard } from './guards/is-authorized.guard';
import { RestrictedComponent } from './components/restricted/restricted.component';
import { UsersResolver } from './resolvers/users.resolver';
import { ServicesUserResolver } from './resolvers/servicesUser.resolver';
import { ServicesResolver } from './resolvers/services.resolver';
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'restricted', component: RestrictedComponent },
  {
    path: 'admin', component: ReportsContentComponent,
    canActivate: [IsAuthorizeddGuard],
    resolve: { reportedServices: ReportedServicesResolver, allUsers: UsersResolver, allServices: ServicesResolver }
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'register', component: RegistrationComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '', component: MainContentComponent,
        resolve: { friends: FriendsResolver }
      },
      {
        path: 'home', component: MainContentComponent,
        resolve: { friends: FriendsResolver }
      },
      {
        path: 'home/service/:userId', component: ServiceInfoComponent,
      },
      {
        path: 'registerService', component: RegisterServiceComponent,
        canActivate: [IsLoggedGuard]
      },
      {
        path: 'user/edit/:userId', component: UserEditComponent,
        canActivate: [IsLoggedGuard]
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
