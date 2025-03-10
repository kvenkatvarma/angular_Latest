import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
     firstName:new FormControl(null),
     lastName:new FormControl(null),
     email:new FormControl(null),
     mobile:new FormControl(null),
     dateOfBirth:new FormControl(null),
     gender :new FormControl(null),
     countryID : new FormControl(null)
    });
  }

}
