import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth : AngularFireAuth,
    private angularFireStore : AngularFirestore
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

   createUser(user: User){
     this.angularFireStore
      .collection("firebase-authentication")
      .add(user)
       .then(res => console.log(res),err => console.log(err));
  }

  getAllUsers(){
    let users = this.angularFireStore
      .collection("firebase-authentication")
      .snapshotChanges();

    // console.log(users);
    users.subscribe(res => {
      res.forEach(value => console.log(value.payload.doc.data()));
    });


  }
}
