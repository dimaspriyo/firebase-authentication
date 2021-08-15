import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formTitle: string = "Login";


  appForm = this.fb.group({
    email: [''],
    password: ['']
  })


  get getEmail() {
    return this.appForm.get('email');
  }

  get getPassword() {
    return this.appForm.get('password');
  }

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formTitle == "Login") {
      console.log("Do some Login logic");
    } else if (this.formTitle == "Register") {
      console.log("Do some Register logic");
    }
    console.log("email : " + this.getEmail?.value + " & password : " + this.getPassword?.value);
  }

  updateTitle(menu: string) {
    this.formTitle = menu;
  }

}
