import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { registerService } from 'src/app/conections/services/resolvers';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AlertsComponent } from '../alerts/alerts.component';
import firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  downloadURL: Observable<string>;
  fb;


  constructor(
    private connection: GraphqlConnectionService,
    private formBuilder: FormBuilder,
    private firebase: AngularFireStorage,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  async registerService() {
    var Filter = require('bad-words'), filter = new Filter();
    var filter = new Filter();
    var newBadWords = ['carepicha', 'playo', 'malparido', 'muerase'];
    filter.addWords(...newBadWords);

    if (this.serviceForm.valid) {
      if (this.serviceForm.controls['title'].value == filter.clean(this.serviceForm.controls['title'].value)) {
        if (this.serviceForm.controls['description'].value == filter.clean(this.serviceForm.controls['description'].value)) {
          const query = registerService(this.serviceForm.controls['title'].value, this.serviceForm.controls['description'].value);
          try {
            const response = await this.connection.post(query, true);
            console.log(response);
          } catch (e) {
            this._snackBar.openFromComponent(AlertsComponent, {
              duration: 2 * 1000,
              data: { message: 'Hubo un problema registrando el servicio', type: 1 },
            });
          }
        } else {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 4 * 1000,
            data: { message: 'No se publico el servicio ya que la descripcion incumple nuestras politicas de lenguaje apropiado', type: 1 },
          });
        }
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 4 * 1000,
          data: { message: 'No se publico el servicio ya que el titulo incumple nuestras politicas de lenguaje apropiado', type: 1 },
        });
      }



    }
  }

  selectFile(event: any) {

    var mimeType = event.target.files[0].type;
    var path = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.firebase.ref(filePath);
    const task = this.firebase.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });


    reader.onload = (_event) => {
      this.url = reader.result;

      this.uploadedImgArray.push(this.url);
    }
  }



}
