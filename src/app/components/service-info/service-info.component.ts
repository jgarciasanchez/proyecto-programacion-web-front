import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/conections/services/response';
import { getUserById } from 'src/app/conections/user/resolver';
import { GetUserByIdOutput, User } from 'src/app/conections/user/response';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css']
})
export class ServiceInfoComponent implements OnInit {

  userId: string;
  userInfo: User;
  serviceForm: FormGroup;
  service: Service;

  constructor(private route: ActivatedRoute,
    private connection: GraphqlConnectionService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    // this.serviceForm = this.formBuilder.group({
    //   name: new FormControl('', [Validators.required]),
    //   lastName: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required]),
    //   role: new FormControl('', [Validators.required]),
    //   status: new FormControl('', [Validators.required]),
    // })

    
    this.userId = this.route.snapshot.params['userId'];
    const query = getUserById(parseInt(this.userId));
    this.connection.postHttp(query, true).subscribe(req => {
      const { getUserById }: any = req.data;
      let { success, data }: GetUserByIdOutput = getUserById;
      this.userInfo = data;
      this.service.id
      // this.serviceForm.controls['name'].setValue(data.name);
      // this.serviceForm.controls['lastName'].setValue(data.lastName);
      console.log(req);
    }, errr => {
      console.log(errr);
    });
  }

  edit(){

  }
}
