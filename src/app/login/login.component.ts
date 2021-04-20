import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
error=''
isError:boolean=false
  constructor(private fb:FormBuilder,private todoService:TodoService,private route:Router) { }

  loginForm=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required]]
  })

  ngOnInit(): void {
  }

    login()
    {
      let email=this.loginForm.controls.email.value
      let password=this.loginForm.controls.password.value

      if(this.loginForm.controls.email.value=='' && this.loginForm.controls.password.value=='')
      {
      this.error="All fields are mandatory!"

      }
      else{
        this.todoService.signin(email,password)
      .then(user=>{
        if(user)
        {
          this.route.navigate(['/todo'])
          this.todoService.getUser()
          this.todoService.isUser.next(true)
        }
      })
      .catch(error=>{
        if(error.code="auth/wrong-password")
        {
          this.error="Wrong Password"
        }
        if(error.code="auth/user-not-found")
        {
          this.error="There is no user record corresponding to this identifier."
        }
      })
      }



    }
}
