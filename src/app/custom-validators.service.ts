import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }
  public static minimumAgeValidator(minAge:number):ValidatorFn{
    return (control:AbstractControl) :ValidationErrors | null=>{
      if(!control.value)
      {
        return null;
      }
      var today = new Date();
      var dob= new Date(control.value);
      var diffMillisec = Math.abs(today.getTime()- dob.getTime());
      var diffYears = (diffMillisec / (1000 * 60 * 60 * 24))/365.25;
      if(diffYears >= minAge)
      {
        return null;
      }
      else{
        return {minAge:{valid:false}};
      }
    };
  }
}
