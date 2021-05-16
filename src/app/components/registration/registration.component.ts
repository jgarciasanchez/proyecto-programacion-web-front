import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { RegisterUserOutput } from 'src/app/conections/register/reponse';
import { registerUser } from 'src/app/conections/register/resolver';
import { RegisterUserInput } from 'src/app/conections/register/input';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { InputValidators } from '../../providers/validators/inputvalidators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css','../../../assets/bootstrap/css/bootstrap.min.css','../../../assets/fonts/fontawesome-all.min.css','../../../assets/fonts/font-awesome.min.css','../../../assets/fonts/fontawesome5-overrides.min.css']
})
export class RegistrationComponent implements OnInit {

  isloading:boolean;
  formGroup:FormGroup;
  log_user: FormControl;
  log_password: FormControl;
  log_name: FormControl;
  log_lastName: FormControl;
  log_offerer: FormControl;
  log_email: FormControl;
  log_repeatPassword: FormControl;

  constructor(
    private router: Router,
    private connection: GraphqlConnectionService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formConstructor();
  }

  formConstructor(){
    this.log_user = new FormControl('', [Validators.required]);
    this.log_password =  new FormControl('', [
      Validators.required,
      Validators.maxLength(16)
    ]);
    this.log_name= new FormControl('', [Validators.required]);
    this.log_lastName= new FormControl('', [Validators.required]);
    this.log_offerer= new FormControl('', [Validators.required]);
    this.log_password = new FormControl('', [Validators.required]);
    this.log_email = new FormControl('', [Validators.required]);
    this.log_repeatPassword =  new FormControl('', [Validators.required]);

    this.formGroup = this.formBuilder.group({
      log_user: this.log_user,
      log_password: this.log_password,
      log_lastName: this.log_lastName,
      log_offerer: this.log_offerer,
      log_name: this.log_name,
      log_email: this.log_email,
      log_repeatPassword: this.log_repeatPassword,
    });
  }

  async signUp(){
    var user:RegisterUserInput =this.getCurrentUser();
    const query = registerUser(user);
    try{
      const response = await this.connection.post(query, true);
      console.log(response);
      if(response){
        const { registerUser } : any = response.data;
        let { success, data } : RegisterUserOutput  = registerUser;
        console.log(success);
        if( success ){
          this.router.navigate(['/', 'login']);
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
      password: this.getType('log_password'),
      email: this.getType('log_email'),
      lastName: this.getType('log_lastName'),
      name: this.getType('log_name'),
    }
    return user;
  }

  getType(type){
    return this.formGroup.controls[type].value;
  }


}
