import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { getUserById, updateUser } from 'src/app/conections/user/resolver';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  serviceForm: FormGroup;
  formGroup: FormGroup;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private connection: GraphqlConnectionService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {


    this.userId = this.route.snapshot.params['userId'];
    const query = getUserById(parseInt(this.userId));
    this.connection.postHttp(query, true).subscribe(req => {

      this.serviceForm = this.formBuilder.group({
        name: new FormControl(req.data.getUserById.data.name, [Validators.required]),
        lastName: new FormControl(req.data.getUserById.data.lastName, [Validators.required]),
        email: new FormControl(req.data.getUserById.data.email, [Validators.required]),
        password: new FormControl('', [Validators.required]),
      });
    }, errr => {
      console.log(errr);
    });
  }

  editUser() {
    if (this.serviceForm.valid) {
      const query = updateUser(parseInt(this.userId),
        this.serviceForm.controls['name'].value,
        this.serviceForm.controls['lastName'].value,
        this.serviceForm.controls['email'].value);
        this.connection.postHttp(query, true).subscribe(req => {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Información actualizada con exíto', type: 1 },
        });
        }, errr => {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Hubo un problema editando el usuario', type: 1 },
          });
        });
    }

  }

}
