import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore
  ) {
  }

  async signIn(email: string, password: string): Promise<boolean> {


    let isSignedIn: boolean = false;
  await  this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(value =>  {
        console.log("Login Success");
        isSignedIn = true;
      })
      .catch(reason => {
      console.log(reason);
      isSignedIn =  false;
    });

    // console.log(userCredential);
    // if (userCredential.user != null) {
    //   localStorage.setItem("user", JSON.stringify(userCredential.user))
    //   console.log("Login Success");
    //   isSignedIn = true;
    // }

    return isSignedIn;
  }

  async signOut() {
    await this.angularFireAuth.signOut();
    localStorage.removeItem('user');
  }

  async createUser(user: User): Promise<boolean> {
    // console.log(user);
    let isUserCreated: boolean = false;
    // await this.angularFireStore
    //   .collection("firebase-authentication")
    //   .add(user)
    //   .then(value => {
    //     console.log("User Created Succesfully");
    //     isUserCreated=true;
    //   })
    //   .catch(reason => console.log(reason));

    await this.angularFireAuth.createUserWithEmailAndPassword(user.email,user.password)
      .then(value => isUserCreated=true)
      .catch(reason => console.log(reason));

    return isUserCreated;
  }

  getAllUsers() {
    return this.angularFireStore
      .collection("firebase-authentication")
      .snapshotChanges();

  }

  getUserByEmail(email: string) {
    this.angularFireStore
      .collection("firebase-authentication", ref => ref.where('email', '==', email))
  }
}
