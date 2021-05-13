import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { LoginResponseData, LoginUserOutput } from 'src/app/conections/auth/response';
import { login } from 'src/app/conections/auth/resolver';
import {  } from 'src/app/conections/auth/input';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { InputValidators } from '../../providers/validators/inputvalidators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/bootstrap/css/bootstrap.min.css','../../../assets/fonts/fontawesome-all.min.css','../../../assets/fonts/font-awesome.min.css','../../../assets/fonts/fontawesome5-overrides.min.css']
})
export class LoginComponent {

  playerName: string;
  isloading:boolean;
  formGroup:FormGroup;
  log_user: FormControl;
  log_password: FormControl;

  constructor(
    private router: Router,
    private connection: GraphqlConnectionService,
    public formBuilder: FormBuilder,
    private authService: AuthService
    ) {
    }


  ngOnInit() {
    this.formConstructor();
  }

  formConstructor(){
    this.log_user = new FormControl('', [Validators.required]);
    this.log_password =  new FormControl('', [
      Validators.required,
      Validators.maxLength(16)
    ]);

    this.formGroup = this.formBuilder.group({
      log_user: this.log_user,
      log_password: this.log_password
    });
  }

  async signIn(){
    var user=this.getCurrentUser();
    const query = login(user.username,user.password);
    try{
      const response = await this.connection.post(query, true);
      console.log(response);
      if(response){
        const { loginUser } : any = response.data;
        let { success, data } : LoginUserOutput  = loginUser;
        console.log(success);
        if( success ){
          this.authService.setAuthenticated("true");
          this.router.navigate(['/', 'home']);
        }else{
            console.log("fallo");
        }
      }else{
        console.log("fallo");      
      } 
    }catch(e){
      console.log("fallo");
    }
  }

  getCurrentUser(){
    const user = {
      username: this.getType('log_user'),
      password: this.getType('log_password')
    }
    return user;
  }

  getType(type){
    return this.formGroup.controls[type].value;
  }

}
