import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  genders =["male","female"];
  countries : Country[] = [];
  constructor(private countryService:CountriesService) { }

  ngOnInit(): void {
     this.countries = this.countryService.getCountries();

    this.signUpForm = new FormGroup({
      personName: new FormGroup({
        firstName:new FormControl(null),
        lastName:new FormControl(null),
      }),

     email:new FormControl(null),
     mobile:new FormControl(null),
     dateOfBirth:new FormControl(null),
     gender :new FormControl(null),
     countryID : new FormControl(null),
     receiveNewsLetters:new FormControl(null),
     skills: new FormArray([])
    });
    this.signUpForm.valueChanges.subscribe(
      (value)=>{
        console.log(value);
      }
    );
  }
  onSubmitClick(){
    this.signUpForm.setValue({
    firstName : "Adam",
    lastName: "Varma",
    email : "abc@gmail.com",
    mobile: "9898989879",
    dateOfBirth: "2020-01-01",
    gender:"male",
    countryID:2,
    receiveNewsLetters:true
    });
  }
  onAddSkill(){
   var formGroup = new FormGroup({
    skillName:new FormControl(null),
    level: new FormControl(null)
   });
   (<FormArray>this.signUpForm.get('skills')).push(formGroup);
  }
  onRemoveClick(index:number){
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }
}
