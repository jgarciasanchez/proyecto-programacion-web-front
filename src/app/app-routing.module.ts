import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: 'login', component: LoginMenuComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
  },
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'Home', component: MainContentComponent
      },
      {
        path: 'admin', component: MainContentComponent
      }

    ]
  },
  // {path: 'main', component: },
  { path: '', component: LoginMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
