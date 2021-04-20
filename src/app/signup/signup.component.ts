import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
error=''

signupForm=this.fb.group({
  email:['',[Validators.email,Validators.required]],
  password:['',[Validators.required,Validators.minLength(8)]]
})

constructor(private fb:FormBuilder,private todoService:TodoService,private route:Router){}

  ngOnInit(): void {
  }


  signup()
    {
      let email=this.signupForm.controls.email.value
      let password=this.signupForm.controls.password.value

      if(this.signupForm.controls.email.value=='' && this.signupForm.controls.password.value=='')
      {
      this.error="All fields are mandatory!"

      }
      else{
        this.todoService.signup(email,password)
    .then(user=>{
          this.route.navigate(['/todo'])
      })
      .catch(error=>{
        this.error=error.message
      })
      }



    }

}
