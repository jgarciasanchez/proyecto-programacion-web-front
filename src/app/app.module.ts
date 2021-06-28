import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { NavBarMainComponent } from './components/nav-bar-main/nav-bar-main.component';
import { LeftOptionsPanelComponent } from './components/left-options-panel/left-options-panel.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ServiceComponent } from './components/service/service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportsContentComponent } from './components/reports-content/reports-content.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RegisterServiceComponent } from './components/register-service/register-service.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RestrictedComponent } from './components/restricted/restricted.component';
import { HttpClientModule } from '@angular/common/http';
import { ExportToCsv } from 'export-to-csv';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialFileInputModule } from 'ngx-material-file-input';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    NavBarMainComponent,
    LeftOptionsPanelComponent,
    MainContentComponent,
    ServiceComponent,
    ReportsContentComponent,
    RegisterServiceComponent,
    AlertsComponent,
    StarRatingComponent,
    RestrictedComponent,
    UserEditComponent,
    ServiceInfoComponent
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),


    FormsModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatAutocompleteModule,
    AngularFireStorageModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatRadioModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBNxhZXKCR-ylgFjJ4gXwa5tpwptzGNSCQ",
      authDomain: "network-services-una.firebaseapp.com",
      projectId: "network-services-una",
      databaseURL: 'gs://network-services-una.appspot.com',
      storageBucket: "network-services-una.appspot.com",
      messagingSenderId: "606485274886",
      appId: "1:606485274886:web:70b85ffd73b11eb9bffe87"
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
