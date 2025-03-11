import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray,FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CustomValidatorsService } from '../custom-validators.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  genders =["male","female"];
  countries : Country[] = [];
  constructor(private countryService:CountriesService,private formBuilder:FormBuilder,private customValidatorsService:CustomValidatorsService) { }

  ngOnInit(): void {
     this.countries = this.countryService.getCountries();
     this.signUpForm["submitted"] = true;
    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName:[null,[Validators.required,Validators.minLength(2)]],
        lastName:[null,[Validators.required,Validators.minLength(2)]]
      }),

      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth: [null, [Validators.required,this.customValidatorsService.minimumAgeValidator(18)]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
      gender: [null, [Validators.required]],
      countryID: [null, [Validators.required]],
     receiveNewsLetters:null,
     skills: this.formBuilder.array([])
    },{
      validators:[this.customValidatorsService.compareValidator("confirmPassword","password")]
    });
    this.signUpForm.valueChanges.subscribe(
      (value)=>{
        console.log(value);
      }
    );
  }
  onSubmitClick(){
    this.signUpForm["submitted"] = true;
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
   var formGroup = this.formBuilder.group({
    skillName:null,
    level: null
   });
   (<FormArray>this.signUpForm.get('skills')).push(formGroup);
  }
  onRemoveClick(index:number){
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }
}
