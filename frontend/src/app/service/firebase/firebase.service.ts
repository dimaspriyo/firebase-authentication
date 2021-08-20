import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../model/User";
import firebase from "firebase";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


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


    let isLoggedIn = false
    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password).then(value => {
        localStorage.setItem("cred", JSON.stringify(value.user));
        isLoggedIn = true;
      });
    } catch (e) {
      console.log(e);
    }

    return isLoggedIn;
    //   .then(value =>  {
    //     console.log()
    //     console.log("Login Success");
    //     isSignedIn = true;
    //   })
    //   .catch(reason => {
    //   console.log(reason);
    //   isSignedIn =  false;
    // });
    //
    // return isSignedIn;
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

    await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(value => isUserCreated = true)
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

  async signInWithGoogle(): Promise<boolean>{
    let isLoggedIn: boolean = false;
    await this.angularFireAuth.signInWithPopup(new GoogleAuthProvider())
      .then(value => isLoggedIn = true)
      .catch(reason => console.log(reason));
    return isLoggedIn;
  }
}
