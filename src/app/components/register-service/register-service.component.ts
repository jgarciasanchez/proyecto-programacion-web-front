import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent implements OnInit {

  fileAttr = 'Choose File';
  uploadedImgArray = [];


  constructor() { }

  ngOnInit(): void {
  }

  url: any;

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
