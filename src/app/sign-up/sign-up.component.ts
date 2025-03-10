import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
 
  signUpForm: FormGroup;
  genders =["male","female"];
  
  constructor() { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
     firstName:new FormControl(null),
     lastName:new FormControl(null),
     email:new FormControl(null),
     mobile:new FormControl(null),
     dateOfBirth:new FormControl(null),
     gender :new FormControl(null)
    });
  }

}
