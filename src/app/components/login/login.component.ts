import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { LoginResponseData, LoginUserOutput } from 'src/app/conections/auth/response';
import { login } from 'src/app/conections/auth/resolver';
import { } from 'src/app/conections/auth/input';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from '../alerts/alerts.component';
import { getCurrentUser } from 'src/app/conections/user/resolver';
import { GetCurrentUserOutput } from 'src/app/conections/user/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../assets/fonts/fontawesome-all.min.css',
    '../../../assets/fonts/font-awesome.min.css',
    '../../../assets/fonts/fontawesome5-overrides.min.css']
})
export class LoginComponent {

  playerName: string;
  isloading: boolean;
  formGroup: FormGroup;
  log_user: FormControl;
  log_password: FormControl;

  constructor(
    private router: Router,
    private connection: GraphqlConnectionService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
  }


  ngOnInit() {
    this.formConstructor();
  }

  formConstructor() {
    this.log_user = new FormControl('', [Validators.required]);
    this.log_password = new FormControl('', [
      Validators.required,
      Validators.maxLength(16)
    ]);

    this.formGroup = this.formBuilder.group({
      log_user: this.log_user,
      log_password: this.log_password
    });
  }

  onRegister(){
    this.router.navigate(['/', 'register']);
  }

  async signIn() {
    var user = this.getCurrentUser();
    const query = login(user.username, user.password);
    try {
      const responseLoginUser = await this.connection.post(query, true);
      if (responseLoginUser) {
        const { loginUser }: any = responseLoginUser.data;
        let { success, data, token }: LoginUserOutput = loginUser;
        if (success) {
          this.authService.setAuthenticated("true");
          this.authService.setToken(token);
          const query = getCurrentUser();
          try {
            const responseCurrentUser = await this.connection.post(query, true);
            const { getCurrentUser }: any = responseCurrentUser.data;
            let { data }: GetCurrentUserOutput = getCurrentUser;
            this.authService.setCurrentUserRole(data.role);
          } catch (e) {
            this._snackBar.openFromComponent(AlertsComponent, {
              duration: 2 * 1000,
              data: { message: 'Error obteniendo el usuario actual', type: 1 },
            });
          }
          this.router.navigate(['/', 'home']);
        } else {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Fallo el inicio de sesion', type: 1 },
          });
        }
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Fallo el inicio de sesion', type: 1 },
        });
      }
    } catch (e) {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Fallo el inicio de sesion', type: 1 },
      });
    }
  }

  getCurrentUser() {
    const user = {
      username: this.getType('log_user'),
      password: this.getType('log_password')
    }
    return user;
  }

  getType(type) {
    return this.formGroup.controls[type].value;
  }

}
