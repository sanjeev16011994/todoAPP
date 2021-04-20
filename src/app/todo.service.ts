import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import {AngularFireAuth} from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
todos=[]
uid:string;
userEmail:string;
isUser=new Subject<boolean>();

  constructor(private fs:AngularFirestore,private auth:AngularFireAuth,private route:Router) { }


  getState():Observable<boolean>
  {
return this.isUser.asObservable()
  }

  addTodo(title,status)
  {
    this.fs.collection('alltodos').doc(this.uid).collection('todos').add({
      title: title,
      status:status
  })
  }

  updateTodo(title,status,updateId)
  {
    this.fs.collection('alltodos').doc(this.uid).collection('todos').doc(updateId).update({
      title:title,
      status:status,

  })
  }


  deleteTodo(id)
  {
    this.fs.collection('alltodos').doc(this.uid).collection('todos').doc(id).delete();

  }



  signin(email,password)
  {
     return this.auth.signInWithEmailAndPassword(email,password)
  }

  signup(email,password){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }


  signOut()
  {
    this.auth.signOut().then(res=>{
      this.uid=''
      this.isUser.next(false)
      this.route.navigate(['/login'])
    })
  }

  getUser()
  {
    this.auth.onAuthStateChanged(user=>{
      if(user)
      {
        this.uid=user.uid;
        this.userEmail=user.email
      }

  })
  }


}
