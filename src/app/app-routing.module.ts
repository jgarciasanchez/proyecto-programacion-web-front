import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReportsContentComponent } from './components/reports-content/reports-content.component';
import { ServicesResolver } from './resolvers/services.resolver';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { RegisterServiceComponent } from './components/register-service/register-service.component';

const routes: Routes = [
  {
    path: 'admin', component: ReportsContentComponent
  }, 
  {
     path: 'login', component: LoginComponent 
  },
  {
    path: '', component: MainComponent,
    // canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: '', component: MainContentComponent,
        resolve: {services: ServicesResolver}
      },
      {
        path: 'home', component: MainContentComponent,
        resolve: {services: ServicesResolver}
      },
      {
        path: 'admin', component: MainContentComponent
      },
      {
        path: 'registerService', component: RegisterServiceComponent,
        canActivate: [IsAuthenticatedGuard]
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
