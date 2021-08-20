import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FirebaseService} from "../service/firebase/firebase.service";
import Swal from 'sweetalert2';

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
    public firebaseService: FirebaseService
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
      let isLoggedIn = await this.firebaseService.signIn(this.getEmail?.value, this.getPassword?.value);
      if (isLoggedIn) {
        Swal.fire('Login Succeed', "", "success");
        this.appForm.reset();
      } else {
        Swal.fire('Login Failed', "", "warning");
      }
    } else if (this.formTitle == "Register") {
      let isUserCreated = await this.firebaseService.createUser(this.appForm.value);
      if (isUserCreated) {
        Swal.fire('Register Succeed', "", "success");
        this.appForm.reset();
      } else {
        Swal.fire('Register Failed', "", "warning");
      }
    }
  }

  updateTitle(menu: string) {
    this.formTitle = menu;
    this.appForm.reset();
  }

  async signInWithGoogle() {
    let isLoggedIn: boolean = await this.firebaseService.signInWithGoogle();
    if (isLoggedIn) {
      Swal.fire('Login Succeed', "", "success");
      this.appForm.reset();
    } else {
      Swal.fire('Login Failed', "", "warning");
    }
  }

}
