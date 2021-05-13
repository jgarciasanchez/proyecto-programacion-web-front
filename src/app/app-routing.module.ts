import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  {
     path: 'login', component: LoginComponent 
    /*
    path: 'login', component: LoginMenuComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
    */
  },
  {
    path: 'register', component: RegistrationComponent 

  },
  {
    path: 'home', component: MainComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
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
