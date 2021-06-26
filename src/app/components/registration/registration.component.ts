import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { RegisterUserOutput } from 'src/app/conections/register/reponse';
import { registerUser } from 'src/app/conections/register/resolver';
import { RegisterUserInput } from 'src/app/conections/register/input';
import { Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AlertsComponent } from '../alerts/alerts.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidParent || invalidCtrl;
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', ]
})
export class RegistrationComponent implements OnInit {


  visible = true;
  formGroup: FormGroup;
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
    private router: Router,
    private connection: GraphqlConnectionService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {


  }

  ngOnInit() {
    this.formConstructor();
    this.formGroup.controls['log_tags'].statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
    );
  }

  formConstructor() {
    this.formGroup = this.formBuilder.group({
      log_password: new FormControl('', [
        Validators.required,
        Validators.maxLength(16)
      ]),
      log_repeatPassword: [''],
      log_name: ['', [Validators.required]],
      log_lastName: ['', [Validators.required]],
      log_email: ['', [Validators.required,
      Validators.email]],
      log_tags: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
    this.filteredTags = this.formGroup.controls['log_tags'].valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }
  matcher = new MyErrorStateMatcher();

  signUp() {
    if (this.formGroup.valid) {

      var user: RegisterUserInput = this.getCurrentUser();
      const query = registerUser(user, this.tags);

      try {
        this.connection.postHttp(query, true).subscribe(req => {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Usuario registrado correctamente', type: 1 },
          });
          this.router.navigate(['/', 'login']);
        }, err => {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Hubo un problema registrando el usuario', type: 1 },
          });
        });

      } catch (e) {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Hubo un problema registrando el usuario', type: 1 },
        });
      }
    }
  }

  getCurrentUser() {
    const user = {
      password: this.getType('log_password'),
      email: this.getType('log_email'),
      lastName: this.getType('log_lastName'),
      name: this.getType('log_name'),
    }
    return user;
  }

  getType(type) {
    return this.formGroup.controls[type].value;
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
    this.formGroup.controls['log_tags'].setValue(null);

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

  checkPasswords(group: FormGroup) {
    const password = group.controls['log_password'].value;

    const confirmPassword = group.controls['log_repeatPassword'].value;

    return password === confirmPassword ? null : { notSame: true };
  }

  checkTags


}
