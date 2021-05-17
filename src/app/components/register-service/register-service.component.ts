import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { registerService } from 'src/app/conections/services/resolvers';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent implements OnInit {

  fileAttr = 'Choose File';
  uploadedImgArray = [];
  url: any;
  serviceForm: FormGroup;


  constructor(
    private connection: GraphqlConnectionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  async registerService() {
    if (this.serviceForm.valid) {
      const query = registerService(this.serviceForm.controls['title'].value, this.serviceForm.controls['description'].value);
      try {
        const response = await this.connection.post(query, true);
        console.log(response);
      } catch (e) {
        console.log("fallo");
      }
    }
  }

  selectFile(event: any) {
    var mimeType = event.target.files[0].type;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
      this.uploadedImgArray.push(this.url);
    }
  }

}
