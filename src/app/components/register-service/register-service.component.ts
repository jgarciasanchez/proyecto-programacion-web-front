import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { registerService } from 'src/app/conections/services/resolvers';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AlertsComponent } from '../alerts/alerts.component';
import firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent implements OnInit {

  fileAttr = 'Choose File';
  uploadedImgArray: string[] = [];
  serviceForm: FormGroup;
  downloadURL: Observable<string>;
  fb;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [13, 188];
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('chipList') chipList: MatChipList;


  constructor(
    private connection: GraphqlConnectionService,
    private formBuilder: FormBuilder,
    private firebase: AngularFireStorage,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.serviceForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      log_tags: new FormControl('', [Validators.required]),
    });
    this.filteredTags = this.serviceForm.controls['log_tags'].valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    this.serviceForm.controls['log_tags'].statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
    );
  }

  registerService() {
    var Filter = require('bad-words'), filter = new Filter();
    var filter = new Filter();
    var newBadWords = ['carepicha', 'playo', 'malparido', 'muerase'];
    filter.addWords(...newBadWords);

    if (this.serviceForm.valid) {
      if (this.serviceForm.controls['title'].value == filter.clean(this.serviceForm.controls['title'].value)) {
        if (this.serviceForm.controls['description'].value == filter.clean(this.serviceForm.controls['description'].value)) {
          const query = registerService(this.serviceForm.controls['title'].value,
            this.serviceForm.controls['description'].value,
            this.tags,
            this.uploadedImgArray);
            console.log(query);
            
          this.connection.postHttp(query, true).subscribe(req => {
            console.log("");
          }, err => {
            this._snackBar.openFromComponent(AlertsComponent, {
              duration: 2 * 1000,
              data: { message: 'Hubo un problema registrando el servicio', type: 1 },
            });
          });
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


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }
    this.tagInput.nativeElement.value = '';
  }

  remove(tagToRemove: string): void {
    const index = this.tags.indexOf(tagToRemove);
    this.serviceForm.controls['log_tags'].setValue(null);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  selectFile(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Images/${n}`;
    const fileRef = this.firebase.ref(filePath);
    const task = this.firebase.upload(`Images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.uploadedImgArray.push(this.fb);
            }
          }, erro => {
            console.log(erro);

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
