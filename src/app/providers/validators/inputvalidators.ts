import { AbstractControl, ValidationErrors, ValidatorFn, FormControl, FormGroup } from '@angular/forms';
import libphonenumber from 'google-libphonenumber';

export class InputValidators {

  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    }
  }

  // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe: boolean = false;

    return (phoneControl: AbstractControl): { [key: string]: boolean } => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }
      if (phoneControl.value !== "") {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          let phoneNumber = "" + phoneControl.value + "",
            region = countryControl.value.iso,
            number = phoneUtil.parse(phoneNumber, region),
            isValidNumber = phoneUtil.isValidNumber(number);
          if (isValidNumber) {
            return null;
          }
        } catch (e) {
          return {
            validCountryPhone: true
          };
        }
        return {
          validCountryPhone: true
        };
      }
      else {
        return null;
      }
    };
  };

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('own_password').value; // to get value in input tag
    let passwordConfirm = AC.get('own_confirmpass').value; // to get value in input tag
    if (passwordConfirm == '') {
      AC.get('own_confirmpass').setErrors({ required: true })
      AC.get('own_confirmpass').valid;
      return;
    } else if (password != passwordConfirm) {
      AC.get('own_confirmpass').setErrors({ MatchPassword: true })
    } else {
      AC.get('own_confirmpass').setErrors(null)
      AC.get('own_confirmpass').markAsPristine();
      return;
    }
  }

  static emailValidator(AC: AbstractControl) {
    let email = AC.get('email').value;
    if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static creditCardValidator(AC: AbstractControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    let creditCard = AC.get('creditCard').value;
    var cardno = /^(?:3[47][0-9]{13})$/;
    creditCard = creditCard.replace(/\s/g, '');
    console.log(creditCard)
    if (creditCard == '') {
      AC.get('creditCard').setErrors({ required: true })
    } else if (creditCard.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      console.log("DA")
      AC.get('creditCard').setErrors(null)
    } else if (cardno.test(creditCard)) {
      AC.get('creditCard').setErrors(null)
    } else {
      console.log("D")
      AC.get('creditCard').setErrors({ invalidCreditCard: true })
    }
  }

  static AmexCardnumber(inputtxt) {
    var cardno = /^(?:3[47][0-9]{13})$/;
    return cardno.test(inputtxt);
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
