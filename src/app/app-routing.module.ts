import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReportsContentComponent } from './components/reports-content/reports-content.component';
import { ServicesResolver } from './conections/services/services.resolver';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'admin', component: ReportsContentComponent
  }, 
  {
     path: 'login', component: LoginComponent 
  },
  {
    path: 'register', component: RegistrationComponent 

  },
  {
    path: 'home', component: MainComponent,
    // canActivate: [IsAuthenticatedGuard],
    children: [
      {
        resolve: {services: ServicesResolver},
        path: '', component: MainContentComponent
      },
      {
        path: 'admin', component: MainContentComponent
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
