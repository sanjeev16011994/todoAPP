import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
authstate=this.auth;
  constructor(private auth:AngularFireAuth) { }

  signin(email,password)
  {
	  console.log(email)
     return this.auth.signInWithEmailAndPassword(email,password)
  }

  signup(email,password){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }



}
