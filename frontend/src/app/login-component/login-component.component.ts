import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email : [''],
    password: ['']
  })


  get getEmail(){
    return this.loginForm.get('email');
  }

  get getPassword(){
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
  console.log("email : " + this.getEmail?.value + " & password : " + this.getPassword?.value );
  }
}
