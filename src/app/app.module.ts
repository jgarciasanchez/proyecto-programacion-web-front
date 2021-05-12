import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { LeftOptionsPanelComponent } from './components/left-options-panel/left-options-panel.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ServiceComponent } from './components/service/service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LoginMenuComponent,
    MainComponent,
    NavBarMainComponent,
    LeftOptionsPanelComponent,
    MainContentComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
