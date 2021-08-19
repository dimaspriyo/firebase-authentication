import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FirebaseService} from "../service/firebase/firebase.service";

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

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
  }

  get getEmail() {
    return this.appForm.get('email');
  }

  get getPassword() {
    return this.appForm.get('password');
  }



  ngOnInit(): void {
  }

  async onSubmit() {
    this.firebaseService.getAllUsers();
    if (this.formTitle == "Login") {
      let login =  await this.firebaseService.signIn(this.getEmail?.value,this.getPassword?.value);
      console.log(login);
    } else if (this.formTitle == "Register") {
      let isUserCreated = await this.firebaseService.createUser(this.appForm.value);
      console.log(isUserCreated);
    }
    // console.log("email : " + this.getEmail?.value + " & password : " + this.getPassword?.value);
  }

  updateTitle(menu: string) {
    this.formTitle = menu;
  }

}
