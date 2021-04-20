import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { UserService } from '../user.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { transition, trigger,style,animate } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']

})
export class TodoComponent implements OnInit {
title=''
status:boolean=false
todos=[]
isEdit=false
updateId=''
disabled:boolean=true
user:any
isLoggedIn:boolean;
subscription:Subscription
  constructor(private fs:AngularFirestore,private todoService:TodoService,private userService:UserService) { }

  ngOnInit(): void {
    this.getAlltodo()
    this.subscription=this.todoService.getState().subscribe(state=>{
    this.isLoggedIn=state;
   })
}

  getAlltodo()
  {
    this.fs.collection('alltodos').doc(this.todoService.uid).collection('todos').snapshotChanges().subscribe(data=>{
      this.todos.length=0
      data.forEach(change=>{
        this.todos.push({id:change.payload.doc.id,todo:change.payload.doc.data()})
      })
    })

  }

  add()
  {
    if(this.isEdit)
    {
      this.todoService.updateTodo(this.title,this.status,this.updateId)
      this.title=''
      this.status=false
      this.isEdit=false
      this.disabled=true
      this.updateId=''
    }
    else{
      this.todoService.addTodo(this.title,this.status)
      this.title=''
    }

  }

  edit(title,status,id)
  {
    this.isEdit=true;
    this.title=title;
    this.status=status;
    this.updateId=id;
    this.disabled=false;
  }

  removeTodo(id)
  {
    let i=this.todos.findIndex(todo=>todo.id==id)
    this.todos.splice(i,1)
    this.todoService.deleteTodo(id)
  }


}
