import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean;
 subscription:Subscription
  constructor(private service:TodoService){
      }


  ngOnInit()
  {
    this.subscription=this.service.getState().subscribe(state=>{
      this.isLoggedIn=state;
     })

  }

logout()
{
  this.service.signOut()
}

}
