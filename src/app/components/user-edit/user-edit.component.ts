import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  serviceForm: FormGroup;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    })
    // this.serviceForm.controls['name'].setValue(data.name);
    // this.serviceForm.controls['lastName'].setValue(data.lastName);
  }

  edit() {

  }

  signUp(){}

}
