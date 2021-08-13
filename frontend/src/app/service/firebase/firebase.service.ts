import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public angularFireAuth : AngularFireAuth
  ) {}

  async signIn(email : string, password : string){
    const userCredential = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    if(userCredential.user != null){
      localStorage.setItem("user",JSON.stringify(userCredential.user))
      console.log("Login Success");
    }
  }

  async signOut(){
    await this.angularFireAuth.signOut();
    localStorage.removeItem('user');
  }
}
