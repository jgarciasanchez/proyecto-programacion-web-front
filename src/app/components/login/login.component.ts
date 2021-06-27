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
  styleUrls: ['./login.component.scss',]
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

  onRegister() {
    this.router.navigate(['/', 'register']);
  }

  async signIn() {
    var user = this.getCurrentUser();
    const query = login(user.username, user.password);

    this.connection.postHttp(query, true).subscribe(req => {
      var success: LoginUserOutput = req.data.loginUser.success;
      const token = req.data.loginUser.token;
      if (success) {
        this.authService.setAuthenticated("true");
        this.authService.setToken(token);
        const query = getCurrentUser();
        this.connection.postHttp(query, true).subscribe(req => {
          const { getCurrentUser }: any = req.data;
          let { data }: GetCurrentUserOutput = getCurrentUser;
          this.authService.setCurrentUserRole(data.role);
          this.authService.setCurrentUserName(data.name, data.lastName);
          this.authService.setCurrentId(data.id.toString());
        });
        this.router.navigate(['/', 'home']);
      } else {
        if (req.data.loginUser.code == 1) {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'No se encontro informacion del usuario', type: 1 },
          });
        } else if (req.data.loginUser.code == 2) {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Contraseña erronea', type: 1 },
          });
        }

      }
    }, err => {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Hubo un error al consultar la informacion, intentar mas tarde', type: 1 },
      });
    })
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
